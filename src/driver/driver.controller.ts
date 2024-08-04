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

@ApiTags('driver')
@Controller('driver')
export class DriverController {
  constructor(private readonly driverService: DriverService) {}

  @ApiOperation({ summary: 'Register a new driver' })
  @ApiResponse({
    status: 201,
    description: 'The driver has been successfully registered.',
    type: Driver,
  })
  @Post('register')
  register(@Body() createDriverDto: CreateDriverDto) {
    return this.driverService.register(createDriverDto);
  }

  @ApiOperation({ summary: 'Log in a driver' })
  @ApiResponse({
    status: 200,
    description: 'The driver has been successfully logged in.',
  })
  @Post('login')
  login(@Body() loginDto: { phone: string; password: string }) {
    return this.driverService.login(loginDto.phone, loginDto.password);
  }

  @ApiOperation({ summary: 'Log out a driver' })
  @ApiResponse({
    status: 200,
    description: 'The driver has been successfully logged out.',
  })
  @Post('logout')
  logout(@Body() logoutDto: { refreshToken: string }) {
    return this.driverService.logout(logoutDto.refreshToken);
  }

  @ApiOperation({ summary: 'Create a new driver' })
  @ApiResponse({
    status: 201,
    description: 'The driver has been successfully created.',
    type: Driver,
  })
  @Post()
  create(@Body() createDriverDto: CreateDriverDto) {
    return this.driverService.create(createDriverDto);
  }

  @ApiOperation({ summary: 'Get all drivers' })
  @ApiResponse({
    status: 200,
    description: 'Returns all drivers.',
    type: [Driver],
  })
  @Get()
  findAll() {
    return this.driverService.findAll();
  }

  @ApiOperation({ summary: 'Get a driver by ID' })
  @ApiResponse({
    status: 200,
    description: 'Returns a driver by ID.',
    type: Driver,
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.driverService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update a driver by ID' })
  @ApiResponse({
    status: 200,
    description: 'Updates a driver by ID.',
    type: Driver,
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDriverDto: UpdateDriverDto) {
    return this.driverService.update(+id, updateDriverDto);
  }

  @ApiOperation({ summary: 'Delete a driver by ID' })
  @ApiResponse({
    status: 200,
    description: 'Deletes a driver by ID.',
    type: Driver,
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.driverService.remove(+id);
  }
}
