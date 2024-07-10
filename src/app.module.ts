import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
<<<<<<< HEAD
import { CarModule } from './car/car.module';
=======
import { DeliveryOrderModule } from './delivery_order/delivery_order.module';
>>>>>>> fc37fda84d19ec7774997694c4cfd06adaf71a5d
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
      entities: [],
      synchronize: true,
      logging: false,
    }),
<<<<<<< HEAD
    CarModule,
=======
    DeliveryOrderModule,
>>>>>>> fc37fda84d19ec7774997694c4cfd06adaf71a5d
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
