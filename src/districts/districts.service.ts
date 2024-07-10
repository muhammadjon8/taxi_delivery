import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateDistrictDto } from './dto/create-district.dto';
import { UpdateDistrictDto } from './dto/update-district.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { District } from './entities/district.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DistrictsService {
  constructor(
    @InjectRepository(District)
    private districtRepo: Repository<District>,
  ) {}

  create(createDistrictDto: CreateDistrictDto) {
    return this.districtRepo.save(createDistrictDto);
  }

  findAll() {
    return this.districtRepo.find();
  }

  findOne(id: number) {
    return this.districtRepo.findOneBy({ id });
  }

  async update(id: number, updateDistrictDto: UpdateDistrictDto) {
    await this.districtRepo.update({ id }, updateDistrictDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    const district = await this.districtRepo.findOneBy({ id });
    if (!district) {
      throw new BadRequestException('Bunday id lik tuman mavjud emas');
    }
    await this.districtRepo.delete({ id });
    return `ID: ${id} bo'lgan tuman o'chirildi `;
  }
}
