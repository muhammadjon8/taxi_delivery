import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DeliveryOrder } from './entities/delivery_order.entity';
import { CreateDeliveryOrderDto } from './dto/create-delivery_order.dto';
import { UpdateDeliveryOrderDto } from './dto/update-delivery_order.dto';

@Injectable()
export class DeliveryOrderService {
  constructor(
    @InjectRepository(DeliveryOrder)
    private readonly deliveryOrderRepository: Repository<DeliveryOrder>,
  ) {}

  async create(createDeliveryOrderDto: CreateDeliveryOrderDto) {
    try {
      const deliveryOrder = this.deliveryOrderRepository.create(
        createDeliveryOrderDto,
      );
      console.log(typeof createDeliveryOrderDto.date);
      return this.deliveryOrderRepository.save(deliveryOrder);
    } catch (e) {
      return { error: e.message };
    }
  }

  async findAll() {
    return this.deliveryOrderRepository.find();
  }

  async findOne(id: number) {
    try {
      const deliveryOrder = await this.deliveryOrderRepository.findOne({
        where: { id },
      });
      if (!deliveryOrder) {
        throw new NotFoundException(`DeliveryOrder with ID ${id} not found`);
      }
      return deliveryOrder;
    } catch (e) {
      return { error: e.message };
    }
  }

  async update(id: number, updateDeliveryOrderDto: UpdateDeliveryOrderDto) {
    try {
      await this.deliveryOrderRepository.update({ id }, updateDeliveryOrderDto);
      return this.findOne(id);
    } catch (e) {
      return { error: e.message };
    }
  }

  async remove(id: number) {
    const deliveryOrderToRemove = await this.findOne(id);
    if ('error' in deliveryOrderToRemove) {
      // DeliveryOrder not found, return the error
      return deliveryOrderToRemove;
    }
    return {
      message: 'Deleted succeffsully',
      data: this.deliveryOrderRepository.remove([deliveryOrderToRemove]),
    };
  }
}
