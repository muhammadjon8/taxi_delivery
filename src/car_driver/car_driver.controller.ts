import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CarDriverService } from './car_driver.service';
import { CreateCarDriverDto } from './dto/create-car_driver.dto';
import { UpdateCarDriverDto } from './dto/update-car_driver.dto';

@ApiTags('car-driver')
@Controller('car-driver')
export class CarDriverController {
  constructor(private readonly carDriverService: CarDriverService) {}

  @Post()
  create(@Body() createCarDriverDto: CreateCarDriverDto) {
    return this.carDriverService.create(createCarDriverDto);
  }

  @Get()
  findAll() {
    return this.carDriverService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.carDriverService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCarDriverDto: UpdateCarDriverDto,
  ) {
    return this.carDriverService.update(+id, updateCarDriverDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.carDriverService.remove(+id);
  }
}
