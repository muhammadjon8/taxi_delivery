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
import { CarDriverService } from './car_driver.service';
import { CreateCarDriverDto } from './dto/create-car_driver.dto';
import { UpdateCarDriverDto } from './dto/update-car_driver.dto';
import { CarDriver } from './entities/car_driver.entity';

@ApiTags('car-driver')
@Controller('car-driver')
export class CarDriverController {
  constructor(private readonly carDriverService: CarDriverService) {}

  @ApiOperation({ summary: 'bu yerda post qilinadi' })
  @ApiResponse({
    status: 201,
    description: 'The post created.',
    type: CarDriver,
  })
  @Post()
  create(@Body() createCarDriverDto: CreateCarDriverDto) {
    return this.carDriverService.create(createCarDriverDto);
  }

  @ApiOperation({ summary: 'bu yerda getALL qilinadi' })
  @ApiResponse({
    status: 200,
    description: 'The post created.',
    type: [CarDriver],
  })
  @Get()
  findAll() {
    return this.carDriverService.findAll();
  }

  @ApiOperation({ summary: 'bu yerda getById qilinadi' })
  @ApiResponse({
    status: 200,
    description: 'The getALL created.',
    type: CarDriver,
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.carDriverService.findOne(+id);
  }

  @ApiOperation({ summary: 'bu yerda updated qilinadi' })
  @ApiResponse({
    status: 200,
    description: 'The post updated.',
    type: CarDriver,
  })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCarDriverDto: UpdateCarDriverDto,
  ) {
    return this.carDriverService.update(+id, updateCarDriverDto);
  }

  @ApiOperation({ summary: 'bu yerda deleted qilinadi' })
  @ApiResponse({
    status: 200,
    description: 'The deleted created.',
    type: CarDriver,
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.carDriverService.remove(+id);
  }
}
