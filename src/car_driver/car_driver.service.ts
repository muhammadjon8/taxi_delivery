import { Injectable } from '@nestjs/common';
import { CreateCarDriverDto } from './dto/create-car_driver.dto';
import { UpdateCarDriverDto } from './dto/update-car_driver.dto';

@Injectable()
export class CarDriverService {
  create(createCarDriverDto: CreateCarDriverDto) {
    return 'This action adds a new carDriver';
  }

  findAll() {
    return `This action returns all carDriver`;
  }

  findOne(id: number) {
    return `This action returns a #${id} carDriver`;
  }

  update(id: number, updateCarDriverDto: UpdateCarDriverDto) {
    return `This action updates a #${id} carDriver`;
  }

  remove(id: number) {
    return `This action removes a #${id} carDriver`;
  }
}
