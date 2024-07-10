import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { Car } from './entities/car.entity';

@Injectable()
export class CarService {
  constructor(
    @InjectRepository(Car)
    private readonly carModelRepository: Repository<Car>,
  ) {}

  async create(createCarDto: CreateCarDto) {
    try {
      const deliveryOrder = this.carModelRepository.create(createCarDto);
      return this.carModelRepository.save(deliveryOrder);
    } catch (e) {
      return { error: e.message };
    }
  }

  async findAll() {
    return this.carModelRepository.find();
  }

  async findOne(id: number) {
    try {
      const car = await this.carModelRepository.findOne({
        where: { id },
      });
      if (!car) {
        throw new NotFoundException(`car with ID ${id} not found`);
      }
      return car;
    } catch (e) {
      return { error: e.message };
    }
  }

  async update(id: number, updateCarDto: UpdateCarDto) {
    try {
      await this.carModelRepository.update({ id }, updateCarDto);
      return this.findOne(id);
    } catch (e) {
      return { error: e.message };
    }
  }

  async remove(id: number) {
    const carModelRepository = await this.findOne(id);
    if ('error' in carModelRepository) {
      // DeliveryOrder not found, return the error
      return carModelRepository;
    }
    return this.carModelRepository.remove([carModelRepository]);
  }
}
