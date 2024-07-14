import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDriverDto } from './dto/create-driver.dto';
import { UpdateDriverDto } from './dto/update-driver.dto';
import { Driver } from './entities/driver.entity';

@Injectable()
export class DriverService {
  constructor(
    @InjectRepository(Driver)
    private readonly driverModelRepository: Repository<Driver>,
  ) {}
  async create(createDriverDto: CreateDriverDto) {
    try {
      const deliveryOrder = this.driverModelRepository.create(createDriverDto);
      return this.driverModelRepository.save(deliveryOrder);
      console.log('bek');
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
        throw new NotFoundException(`driver with ID ${id} not found`);
      }
      return driver;
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
