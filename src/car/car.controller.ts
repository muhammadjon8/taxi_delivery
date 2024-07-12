import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CarService } from './car.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { Car } from './entities/car.entity';

@ApiTags('car')
@Controller('car')
export class CarController {
  constructor(private readonly carService: CarService) {}

  @ApiOperation({ summary: 'bu yerda post qilinadi' })
  @ApiResponse({
    status: 201,
    description: 'The post created.',
    type: Car,
  })
  @Post()
  create(@Body() createCarDto: CreateCarDto) {
    return this.carService.create(createCarDto);
  }

  @ApiOperation({ summary: 'bu yerda getALL qilinadi' })
  @ApiResponse({
    status: 200,
    description: 'The getALL qilinadi',
    type: [Car],
  })
  @Get()
  findAll() {
    return this.carService.findAll();
  }

  @ApiOperation({ summary: 'bu yerda getbyId qilinadi' })
  @ApiResponse({
    status: 200,
    description: 'The getbyid',
    type: Car,
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.carService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCarDto: UpdateCarDto) {
    return this.carService.update(+id, updateCarDto);
  }

  @ApiOperation({ summary: 'bu yerda deletebyId qilinadi' })
  @ApiResponse({
    status: 200,
    description: 'The deletebyId',
    type: Car,
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.carService.remove(+id);
  }
}
