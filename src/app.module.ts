import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarModule } from './car/car.module';
import { Car } from './car/entities/car.entity';
import { DeliveryOrderModule } from './delivery_order/delivery_order.module';
import { DriverModule } from './driver/driver.module';
import { Driver } from './driver/entities/driver.entity'
@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      entities: [Car,Driver],
      synchronize: true,
      logging: false,
    }),
    DeliveryOrderModule,
    CarModule,
    DriverModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
