import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTaxiOrderDto } from './dto/create-taxi_order.dto';
import { UpdateTaxiOrderDto } from './dto/update-taxi_order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TaxiOrder } from './entities/taxi_order.entity';
import { Repository } from 'typeorm';
import { Region } from '../regions/entities/region.entity';
import axios from 'axios';

@Injectable()
export class TaxiOrderService {
  constructor(
    @InjectRepository(TaxiOrder)
    private taxiOrderRepo: Repository<TaxiOrder>,
    @InjectRepository(Region)
    private region: Repository<Region>,
  ) {}

  async create(createTaxiOrderDto: CreateTaxiOrderDto) {
    try {
      const { from_district_id, to_district_id } = createTaxiOrderDto;
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
      // let config = {
      //   method: 'get',
      //   url: `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${region.latitude}%2C${region.longitude}&destinations=${toRegion.latitude}%2C${toRegion.longitude}&key=${process.env.GOOGLE_API_KEY}`,
      //   headers: {},
      // };
      // const response = await axios(config);
      // const distance = response.data.rows[0].elements[0].distance.text;
      // const duration = response.data.rows[0].elements[0].duration.text;
      // const deliveryOrder = this.taxiOrderRepo.create({
      //   distance: distance,
      //   duration: duration,
      //   ...createTaxiOrderDto,
      // });
      // return this.taxiOrderRepo.save(deliveryOrder);
    } catch (e) {
      return { error: e.message };
    }
  }

  findAll() {
    return this.taxiOrderRepo.find();
  }

  findOne(id: number) {
    return this.taxiOrderRepo.findOneBy({ id });
  }

  async update(id: number, updateTaxiOrderDto: UpdateTaxiOrderDto) {
    await this.taxiOrderRepo.update({ id }, updateTaxiOrderDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    const taxiOrder = await this.taxiOrderRepo.findOneBy({ id });
    if (!taxiOrder) {
      throw new BadRequestException(
        'Bunday id lik taxi buyurtmasi mavjud emas',
      );
    }
    await this.taxiOrderRepo.delete({ id });
    return `ID: ${id} bo'lgan taxi buyurtmasi o'chirildi `;
  }
}
