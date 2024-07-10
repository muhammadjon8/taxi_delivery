import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTaxiOrderDto } from './dto/create-taxi_order.dto';
import { UpdateTaxiOrderDto } from './dto/update-taxi_order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TaxiOrder } from './entities/taxi_order.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TaxiOrderService {
  constructor(
    @InjectRepository(TaxiOrder)
    private taxiOrderRepo: Repository<TaxiOrder>,
  ) {}

  create(createTaxiOrderDto: CreateTaxiOrderDto) {
    return this.taxiOrderRepo.save(createTaxiOrderDto);
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
      throw new BadRequestException('Bunday id lik taxi buyurtmasi mavjud emas');
    }
    await this.taxiOrderRepo.delete({ id });
    return `ID: ${id} bo'lgan taxi buyurtmasi o'chirildi `;
  }
}
