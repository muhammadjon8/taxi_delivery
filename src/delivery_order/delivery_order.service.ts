import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DeliveryOrder } from './entities/delivery_order.entity';
import { CreateDeliveryOrderDto } from './dto/create-delivery_order.dto';
import { UpdateDeliveryOrderDto } from './dto/update-delivery_order.dto';
import axios from 'axios';
import { Region } from '../regions/entities/region.entity';
import NodeGeocoder, { Options } from 'node-geocoder';

@Injectable()
export class DeliveryOrderService {
  constructor(
    @InjectRepository(DeliveryOrder)
    private readonly deliveryOrderRepository: Repository<DeliveryOrder>,
    @InjectRepository(Region)
    private readonly region: Repository<Region>,
  ) {}

  async getCoordinates(
    name: string,
  ): Promise<{ latitude: number; longitude: number }> {
    try {
      const response = await fetch(
        `https://api.geoapify.com/v1/geocode/search?text=${name}&format=json&apiKey=0e7cd19cff5e4d6d9163ec21225512f3`,
      );

      if (!response.ok) {
        throw new Error('Failed to fetch coordinates');
      }

      const data = await response.json();
      if (!data.results || data.results.length === 0) {
        throw new Error('No coordinates found for the given name');
      }

      const { lat: latitude, lon: longitude } = data.results[0];
      return { latitude, longitude };
    } catch (error) {
      console.error(error);
      throw new Error(`Error retrieving coordinates: ${error.message}`);
    }
  }

  async create(createDeliveryOrderDto: CreateDeliveryOrderDto) {
    try {
      const { from_district_id, to_district_id } = createDeliveryOrderDto;

      const fromRegion = await this.region.findOne({
        where: { id: from_district_id },
      });
      if (!fromRegion) {
        throw new NotFoundException('From region not found');
      }

      const toRegion = await this.region.findOne({
        where: { id: to_district_id },
      });
      if (!toRegion) {
        throw new NotFoundException('To region not found');
      }

      const fromCoordinates = await this.getCoordinates(fromRegion.name);
      const toCoordinates = await this.getCoordinates(toRegion.name);

      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/distancematrix/json`,
        {
          params: {
            origins: `${fromCoordinates.latitude},${fromCoordinates.longitude}`,
            destinations: `${toCoordinates.latitude},${toCoordinates.longitude}`,
            key: process.env.GOOGLE_API_KEY,
          },
        },
      );

      if (response.data.status !== 'OK') {
        throw new Error('Error fetching distance data from Google Maps API');
      }

      const distance = response.data.rows[0].elements[0].distance.text;
      const duration = response.data.rows[0].elements[0].duration.text;

      const deliveryOrder = this.deliveryOrderRepository.create({
        distance: distance,
        duration: duration,
        ...createDeliveryOrderDto,
      });

      return await this.deliveryOrderRepository.save(deliveryOrder);
    } catch (error) {
      console.error(error); // Log the error for debugging purposes
      throw new InternalServerErrorException('Failed to create delivery order');
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
      message: 'Deleted successfully',
      data: this.deliveryOrderRepository.remove([deliveryOrderToRemove]),
    };
  }
}
