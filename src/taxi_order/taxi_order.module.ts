import { Module } from '@nestjs/common';
import { TaxiOrderService } from './taxi_order.service';
import { TaxiOrderController } from './taxi_order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaxiOrder } from './entities/taxi_order.entity';
import { Region } from '../regions/entities/region.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TaxiOrder, Region])],
  controllers: [TaxiOrderController],
  providers: [TaxiOrderService],
})
export class TaxiOrderModule {}
