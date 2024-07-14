import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCarDriverDto } from './dto/create-car_driver.dto';
import { UpdateCarDriverDto } from './dto/update-car_driver.dto';
import { CarDriver } from './entities/car_driver.entity';

@Injectable()
export class CarDriverService {
  constructor(
    @InjectRepository(CarDriver)
    private carDriverRepo: Repository<CarDriver>,
  ) {}
  create(createCarDriverDto: CreateCarDriverDto) {
    return this.carDriverRepo.save(createCarDriverDto);
  }

  findAll() {
    return this.carDriverRepo.find();
  }

  async findOne(id: number) {
    try {
      const car = await this.carDriverRepo.findOne({
        where: { id },
      });
      if (!car) {
        throw new NotFoundException(`car_driver with ID ${id} not found`);
      }
      return car;
    } catch (e) {
      return { error: e.message };
    }
  }

  async update(id: number, updateCarDto: UpdateCarDriverDto) {
    try {
      await this.carDriverRepo.update({ id }, updateCarDto);
      return this.findOne(id);
    } catch (e) {
      return { error: e.message };
    }
  }

  async remove(id: number) {
    const car_driverModelRepository = await this.findOne(id);
    if ('error' in car_driverModelRepository) {
      return car_driverModelRepository;
    }
    return this.carDriverRepo.remove([car_driverModelRepository]);
  }
}
