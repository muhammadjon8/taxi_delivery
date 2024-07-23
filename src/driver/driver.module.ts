import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DriverController } from './driver.controller';
import { DriverService } from './driver.service';
import { Driver } from './entities/driver.entity';
import { JwtModule } from '@nestjs/jwt'
import { Otp } from './entities/otp.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Driver,Otp]), JwtModule.register({})],
  controllers: [DriverController],
  providers: [DriverService],
})
export class DriverModule {}
