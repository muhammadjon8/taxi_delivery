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
import { DriverService } from './driver.service';
import { CreateDriverDto } from './dto/create-driver.dto';
import { UpdateDriverDto } from './dto/update-driver.dto';
import { Driver } from './entities/driver.entity';


@ApiTags("driver")
@Controller('driver')
export class DriverController {
  constructor(private readonly driverService: DriverService) {}

  @ApiOperation({ summary: 'bu yerda post qilinadi shunaqa' })
  @ApiResponse({
    status: 201,
    description: 'The post created.',
    type: Driver,
  })
  @Post()
  create(@Body() createDriverDto: CreateDriverDto) {
    return this.driverService.create(createDriverDto);
  }

  @ApiOperation({ summary: 'bu yerda getALL qilinadi' })
  @ApiResponse({
    status: 200,
    description: 'The getALL created.',
    type: [Driver],
  })
  @Get()
  findAll() {
    return this.driverService.findAll();
  }

  @ApiOperation({ summary: 'bu yerda getbyID qilinadi' })
  @ApiResponse({
    status: 200,
    description: 'The getbyiD ',
    type: Driver,
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.driverService.findOne(+id);
  }

  @ApiOperation({ summary: 'bu yerda updatebyID qilinadi' })
  @ApiResponse({
    status: 200,
    description: 'The upadatebyiD ',
    type: Driver,
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDriverDto: UpdateDriverDto) {
    return this.driverService.update(+id, updateDriverDto);
  }

  @ApiOperation({ summary: 'bu yerda deletebyID qilinadi' })
  @ApiResponse({
    status: 200,
    description: 'The deletebyiD ',
    type: Driver,
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.driverService.remove(+id);
  }
}
