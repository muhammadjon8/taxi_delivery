import { Module } from '@nestjs/common';
import { DeliveryOrderService } from './delivery_order.service';
import { DeliveryOrderController } from './delivery_order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeliveryOrder } from './entities/delivery_order.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DeliveryOrder])],
  controllers: [DeliveryOrderController],
  providers: [DeliveryOrderService],
})
export class DeliveryOrderModule {}
