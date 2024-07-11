import { Module } from '@nestjs/common';
import { CarDriverService } from './car_driver.service';
import { CarDriverController } from './car_driver.controller';

@Module({
  controllers: [CarDriverController],
  providers: [CarDriverService],
})
export class CarDriverModule {}
