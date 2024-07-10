import { Injectable } from '@nestjs/common';
import { CreateDeliveryOrderDto } from './dto/create-delivery_order.dto';
import { UpdateDeliveryOrderDto } from './dto/update-delivery_order.dto';

@Injectable()
export class DeliveryOrderService {
  create(createDeliveryOrderDto: CreateDeliveryOrderDto) {
    return 'This action adds a new deliveryOrder';
  }

  findAll() {
    return `This action returns all deliveryOrder`;
  }

  findOne(id: number) {
    return `This action returns a #${id} deliveryOrder`;
  }

  update(id: number, updateDeliveryOrderDto: UpdateDeliveryOrderDto) {
    return `This action updates a #${id} deliveryOrder`;
  }

  remove(id: number) {
    return `This action removes a #${id} deliveryOrder`;
  }
}
