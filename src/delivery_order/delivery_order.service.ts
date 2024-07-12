import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DeliveryOrder } from './entities/delivery_order.entity';
import { CreateDeliveryOrderDto } from './dto/create-delivery_order.dto';
import { UpdateDeliveryOrderDto } from './dto/update-delivery_order.dto';
import axios from 'axios';
import { Region } from '../regions/entities/region.entity';

@Injectable()
export class DeliveryOrderService {
  constructor(
    @InjectRepository(DeliveryOrder)
    private readonly deliveryOrderRepository: Repository<DeliveryOrder>,
    @InjectRepository(Region)
    private readonly region: Repository<Region>,
  ) {}

  async create(createDeliveryOrderDto: CreateDeliveryOrderDto) {
    try {
      const { from_district_id, to_district_id } = createDeliveryOrderDto;
      const region = await this.region.findOne({
        where: { id: from_district_id },
      });
      if (!region) {
        throw new NotFoundException('From region not found');
      }
      const toRegion = await this.region.findOne({
        where: { id: to_district_id },
      });
      if (!toRegion) {
        throw new NotFoundException('To region not found');
      }
      let config = {
        method: 'get',
        url: `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${region.latitude}%2C${region.longitude}&destinations=${toRegion.latitude}%2C${toRegion.longitude}&key=${process.env.GOOGLE_API_KEY}`,
        headers: {},
      };
      const response = await axios(config);
      const distance = response.data.rows[0].elements[0].distance.text;
      const duration = response.data.rows[0].elements[0].duration.text;
      const deliveryOrder = this.deliveryOrderRepository.create({
        distance: distance,
        duration: duration,
        ...createDeliveryOrderDto,
      });
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
