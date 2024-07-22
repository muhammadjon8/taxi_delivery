import {
  BadRequestException,
  Injectable,
  NotFoundException,
  Res,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import * as bcrypt from 'bcrypt';
import { Response } from 'express';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UserLoginDto } from './dto/login.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  private async getTokens(user: User) {
    const payload = { id: user.id, is_active: user.isActive };

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

    return { accessToken, refreshToken };
  }

  async login(loginDto: UserLoginDto, @Res() res: Response) {
    const user = await this.userRepository.findOne({
      where: { phone_number: loginDto.phone },
    });

    if (!user || !(await bcrypt.compare(loginDto.password, user.password))) {
      throw new BadRequestException('Invalid credentials');
    }

    const tokens = await this.getTokens(user);

    await this.userRepository.update(user.id, {
      refreshToken: tokens.refreshToken,
    });

    res.cookie('refresh_token', tokens.refreshToken, {
      maxAge: Number(process.env.COOKIE_TIME),
      httpOnly: true,
    });

    return { tokens, message: 'Login successful' };
  }

  async logout(refreshToken: string, res: Response) {
    const userData = await this.jwtService.verifyAsync(refreshToken, {
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
    return { message: 'User logged out successfully' };
  }

  async getToken(): Promise<string> {
    try {
      const formData = new FormData();
      formData.append('email', 'umuhammadjon22@gmail.com');
      formData.append('password', '7ki8uTxViB8yURD7UmwpeQLmTsgD7SduvpnTVIP2');

      const response = await axios.post(
        'https://notify.eskiz.uz/api/auth/login',
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        },
      );

      return response.data.data.token;
    } catch (error) {
      console.error('Error fetching token:', error);
      throw error;
    }
  }

  async sendSms(phone: string): Promise<void> {
    try {
      const response = await axios.post(
        'https://notify.eskiz.uz/api/message/sms/send',
        {
          mobile_phone: phone,
          message: 'Bu Eskiz dan test',
          from: '4546',
          callback_url: 'http://0000.uz/test.php',
        },
        { headers: { Authorization: `Bearer ${process.env.SMS_TOKEN}` } },
      );

      console.log('SMS sent:', response.data);
    } catch (error) {
      console.error('Error sending SMS:', error);
      throw new Error('Failed to send SMS');
    }
  }

  async create(createUserDto: CreateUserDto) {
    if (createUserDto.password !== createUserDto.confirm_password) {
      throw new BadRequestException('Passwords do not match');
    }

    await this.sendSms(createUserDto.phone);

    const hashed_password = await bcrypt.hash(createUserDto.password, 7);
    const newUser = this.userRepository.create({
      ...createUserDto,
      password: hashed_password,
    });

    const savedUser = await this.userRepository.save(newUser);
    const tokens = await this.getTokens(savedUser);
    savedUser.refreshToken = await bcrypt.hash(tokens.refreshToken, 7);

    await this.userRepository.save(savedUser);

    return { data: 'User created successfully', tokens };
  }

  async findAll() {
    return this.userRepository.find();
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const hashed_password = await bcrypt.hash(updateUserDto.password, 7);
    await this.userRepository.update(
      { id },
      { ...updateUserDto, password: hashed_password },
    );
    return this.findOne(id);
  }

  async remove(id: number) {
    const userToRemove = await this.findOne(id);
    if ('error' in userToRemove) {
      return userToRemove;
    }
    return this.userRepository.remove([userToRemove]);
  }
}
