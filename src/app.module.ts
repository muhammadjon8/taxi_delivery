import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminModule } from './admin/admin.module';
import { Admin } from './admin/entities/admin.entity';
import { BalanceModule } from './balance/balance.module';
import { Balance } from './balance/entities/balance.entity';
import { CarModule } from './car/car.module';
import { Car } from './car/entities/car.entity';
import { CarDriverModule } from './car_driver/car_driver.module';
import { CarDriver } from './car_driver/entities/car_driver.entity';
import { DeliveryOrderModule } from './delivery_order/delivery_order.module';
import { DeliveryOrder } from './delivery_order/entities/delivery_order.entity';
import { DistrictsModule } from './districts/districts.module';
import { District } from './districts/entities/district.entity';
import { DriverModule } from './driver/driver.module';
import { Driver } from './driver/entities/driver.entity';
import { Region } from './regions/entities/region.entity';
import { RegionsModule } from './regions/regions.module';
import { TaxiOrder } from './taxi_order/entities/taxi_order.entity';
import { TaxiOrderModule } from './taxi_order/taxi_order.module';
import { User } from './users/entities/user.entity';
import { UsersModule } from './users/users.module';
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
      entities: [
        DeliveryOrder,
        Car,
        Region,
        TaxiOrder,
        Driver,
        District,
        Balance,
        Admin,
        CarDriver,
        User,
      ],
      synchronize: true,
      logging: false,
    }),
    DeliveryOrderModule,
    CarModule,
    RegionsModule,
    DriverModule,
    DistrictsModule,
    BalanceModule,
    AdminModule,
    TaxiOrderModule,
    CarDriverModule,
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
