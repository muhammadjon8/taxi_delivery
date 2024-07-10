import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeliveryOrderModule } from './delivery_order/delivery_order.module';
import { DriverModule } from './driver/driver.module';
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
    DeliveryOrderModule,
    DriverModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
