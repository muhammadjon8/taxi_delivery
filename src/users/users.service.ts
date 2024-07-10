import {
  BadRequestException,
  Injectable,
  NotFoundException,
  Res,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity'; // Assuming you have a User entity
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { UserLoginDto } from './dto/login.dto';
import { Response } from 'express';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}
  async getTokens(user: User) {
    const payload = {
      id: user.id,
      is_active: user.isActive,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async login(loginDto: UserLoginDto, @Res() res: Response) {
    try {
      const user = await this.userRepository.findOne({
        where: { phone_number: loginDto.phone },
      });

      if (!user) {
        throw new BadRequestException('Invalid credentials');
      }

      const passwordMatch = await bcrypt.compare(
        loginDto.password,
        user.password,
      );

      if (!passwordMatch) {
        throw new BadRequestException('Invalid credentials');
      }

      const tokens = await this.getTokens(user);

      // Update the refresh token in the database
      await this.userRepository.update(user.id, {
        refreshToken: tokens.refreshToken,
      });

      // Set the refresh token as a cookie in the response
      res.cookie('refresh_token', tokens.refreshToken, {
        maxAge: Number(process.env.COOKIE_TIME),
        httpOnly: true,
      });

      return { tokens, message: 'Login successful' };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async logout(refreshToken: string, res: Response) {
    try {
      const userData = await this.jwtService.verify(refreshToken, {
        secret: process.env.REFRESH_TOKEN_KEY,
      });

      if (!userData) {
        throw new BadRequestException('User not verified');
      }

      const updatedUser = await this.userRepository.update(
        { id: userData.id },
        { refreshToken: null },
      );

      if (updatedUser.affected === 0) {
        throw new BadRequestException('User not found or not updated');
      }

      res.clearCookie('refresh_token');

      const response = {
        message: 'User logged out successfully',
        // You can include additional data if needed
      };

      return response;
    } catch (error) {
      // Handle errors appropriately
      throw new BadRequestException('Failed to logout');
    }
  }

  async create(createUserDto: CreateUserDto) {
    const { password, confirm_password } = createUserDto;
    console.log(password);

    if (password !== confirm_password) {
      throw new BadRequestException('Passwords do not match');
    }
    try {
      const hashed_password = await bcrypt.hash(password, 7);
      const newUser = this.userRepository.create({
        ...createUserDto,
        password: hashed_password,
      });

      const savedUser = await this.userRepository.save(newUser);

      const tokens = await this.getTokens(savedUser);
      const hashed_refresh_token = await bcrypt.hash(tokens.refreshToken, 7);

      savedUser.refreshToken = hashed_refresh_token;

      const updatedUser = await this.userRepository.save(savedUser);

      return { data: 'User created successfully', tokens: tokens };
    } catch (e) {
      return { error: e.message };
    }
  }

  async findAll() {
    return this.userRepository.find();
  }

  async findOne(id: number) {
    try {
      const user = await this.userRepository.findOne({
        where: { id },
      });
      if (!user) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }
      return user;
    } catch (e) {
      return { error: e.message };
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      const { password } = updateUserDto;
      const hashed_password = await bcrypt.hash(password, 7);
      await this.userRepository.update(
        { id },
        { ...updateUserDto, password: hashed_password },
      );
      return this.findOne(id);
    } catch (e) {
      return { error: e.message };
    }
  }

  async remove(id: number) {
    const userToRemove = await this.findOne(id);
    if ('error' in userToRemove) {
      // User not found, return the error
      return userToRemove;
    }
    return this.userRepository.remove([userToRemove]);
  }
}
