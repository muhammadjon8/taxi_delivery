import { Module } from '@nestjs/common';
import { DeliveryOrderService } from './delivery_order.service';
import { DeliveryOrderController } from './delivery_order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeliveryOrder } from './entities/delivery_order.entity';
import { Region } from '../regions/entities/region.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DeliveryOrder, Region])],
  controllers: [DeliveryOrderController],
  providers: [DeliveryOrderService],
})
export class DeliveryOrderModule {}
