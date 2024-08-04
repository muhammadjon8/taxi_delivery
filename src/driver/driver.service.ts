import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CreateDriverDto } from './dto/create-driver.dto';
import { UpdateDriverDto } from './dto/update-driver.dto';
import { Driver } from './entities/driver.entity';

@Injectable()
export class DriverService {
  constructor(
    @InjectRepository(Driver)
    private readonly driverModelRepository: Repository<Driver>,
    private readonly jwtService: JwtService,
  ) {}

  async register(createDriverDto: CreateDriverDto) {
    // Check if passwords match
    if (createDriverDto.password !== createDriverDto.confirm_password) {
      throw new BadRequestException('Passwords do not match');
    }

    // Hash the password
    const hashed_password = await bcrypt.hash(createDriverDto.password, 7);

    // Create the new driver
    const newDriver = this.driverModelRepository.create({
      ...createDriverDto,
      password: hashed_password,
    });

    // Save the driver to the database
    const savedDriver = await this.driverModelRepository.save(newDriver);

    return { message: 'Driver registered successfully', driver: savedDriver };
  }

  async login(phone: string, password: string) {
    const driver = await this.driverModelRepository.findOne({
      where: { phone },
    });

    if (!driver || !(await bcrypt.compare(password, driver.password))) {
      throw new BadRequestException('Invalid credentials');
    }

    const payload = { id: driver.id, isActive: driver.isActive };
    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.ACCESS_TOKEN_KEY,
      expiresIn: process.env.ACCESS_TOKEN_TIME,
    });
    const refreshToken = this.jwtService.sign(payload, {
      secret: process.env.REFRESH_TOKEN_KEY,
      expiresIn: process.env.REFRESH_TOKEN_TIME,
    });

    await this.driverModelRepository.update(driver.id, {
      refreshToken: refreshToken,
    });

    return { accessToken, refreshToken, message: 'Login successful' };
  }

  async logout(refreshToken: string) {
    const driverData = await this.jwtService.verifyAsync(refreshToken, {
      secret: process.env.REFRESH_TOKEN_KEY,
    });

    if (!driverData) {
      throw new BadRequestException('Driver not verified');
    }

    const updatedDriver = await this.driverModelRepository.update(
      { id: driverData.id },
      { refreshToken: null },
    );

    if (updatedDriver.affected === 0) {
      throw new BadRequestException('Driver not found or not updated');
    }

    return { message: 'Driver logged out successfully' };
  }

  async create(createDriverDto: CreateDriverDto) {
    try {
      const deliveryOrder = this.driverModelRepository.create(createDriverDto);
      return this.driverModelRepository.save(deliveryOrder);
    } catch (e) {
      return { error: e.message };
    }
  }

  findAll() {
    return this.driverModelRepository.find();
  }

  async findOne(id: number) {
    try {
      const driver = await this.driverModelRepository.findOne({
        where: { id },
      });
      if (!driver) {
        throw new NotFoundException(`Driver with ID ${id} not found`);
      }
      return driver;``
    } catch (e) {
      return { error: e.message };
    }
  }

  async update(id: number, updateDriverDto: UpdateDriverDto) {
    try {
      await this.driverModelRepository.update({ id }, updateDriverDto);
      return this.findOne(id);
    } catch (e) {
      return { error: e.message };
    }
  }

  async remove(id: number) {
    const driverModelRepository = await this.findOne(id);
    if ('error' in driverModelRepository) {
      return driverModelRepository;
    }
    return this.driverModelRepository.remove([driverModelRepository]);
  }
}
