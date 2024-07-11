import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarDriverController } from './car_driver.controller';
import { CarDriverService } from './car_driver.service';
import { CarDriver } from './entities/car_driver.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CarDriver])],
  controllers: [CarDriverController],
  providers: [CarDriverService],
})
export class CarDriverModule {}
