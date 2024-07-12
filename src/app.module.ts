import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarModule } from './car/car.module';
import { DeliveryOrderModule } from './delivery_order/delivery_order.module';
import { DeliveryOrder } from './delivery_order/entities/delivery_order.entity';
import { Balance } from './balance/entities/balance.entity';
import { Driver } from './driver/entities/driver.entity';
import { User } from './users/entities/user.entity';
import { Admin } from './admin/entities/admin.entity';
import { BalanceModule } from './balance/balance.module';
import { DriverModule } from './driver/driver.module';
import { UsersModule } from './users/users.module';
import { AdminModule } from './admin/admin.module';
import { Car } from './car/entities/car.entity'
import { CarDriverModule } from './car_driver/car_driver.module';
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
      synchronize: true,
      logging: false,
    }),
    DeliveryOrderModule,
    CarModule,

  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
