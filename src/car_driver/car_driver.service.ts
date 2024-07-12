import { Injectable } from '@nestjs/common';
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

  // async findOne(id: number) {
  //   try {
  //     const driver = await this.carDriverRepo.findOne({
  //       where: { id },
  //     });
  //     if (!driver) {
  //       throw new NotFoundException(`driver  car with ID ${id} not found`);
  //     }
  //     return driver;
  //   } catch (e) {
  //     return { error: e.message };
  //   }
  // }

  // async update(id: number, updateCarDriverDto: UpdateCarDriverDto) {
  //   await this.carDriverRepo.update(id, updateCarDriverDto);
  //   return this.findOne(id);
  // }
  // async remove(id: number) {
  //   const driverModelRepository = await this.findOne(id);
  //   if ('error' in driverModelRepository) {
  //     return driverModelRepository;
  //   }
  //   return this.carDriverRepo.remove([driverModelRepository]);
  // }
}