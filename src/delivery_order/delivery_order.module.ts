import { Module } from '@nestjs/common';
import { DeliveryOrderService } from './delivery_order.service';
import { DeliveryOrderController } from './delivery_order.controller';

@Module({
  controllers: [DeliveryOrderController],
  providers: [DeliveryOrderService],
})
export class DeliveryOrderModule {}
