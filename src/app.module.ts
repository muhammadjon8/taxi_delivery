import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegionsModule } from './regions/regions.module';
import { DistrictsModule } from './districts/districts.module';
import { TaxiOrderModule } from './taxi_order/taxi_order.module';
import { Region } from './regions/entities/region.entity';
import { District } from './districts/entities/district.entity';
import { TaxiOrder } from './taxi_order/entities/taxi_order.entity';
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
    RegionsModule,
    DistrictsModule,
    TaxiOrderModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
