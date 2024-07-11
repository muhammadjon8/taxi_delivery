import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Region } from './entities/region.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RegionsService {
  constructor(
    @InjectRepository(Region)
    private regionRepo: Repository<Region>,
  ) {}

  create(createRegionDto: CreateRegionDto) {
    return this.regionRepo.save(createRegionDto);
  }

  findAll() {
    return this.regionRepo.find();
  }

  findOne(id: number) {
    return this.regionRepo.findOneBy({ id });
  }

  async update(id: number, updateRegionDto: UpdateRegionDto) {
    await this.regionRepo.update({ id }, updateRegionDto);
    return this.findOne(id);
  }

  async remove(id: number) {
  const region = await this.regionRepo.findOneBy({ id });
    if (!region) {
      throw new BadRequestException('Bunday id lik region mavjud emas');
    }
    await this.regionRepo.delete({ id });
    return `ID: ${id} bo'lgan region o'chirildi `;
  } 
 }

