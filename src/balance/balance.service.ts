import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Balance } from './entities/balance.entity';
import { CreateBalanceDto } from './dto/create-balance.dto';

@Injectable()
export class BalanceService {
  constructor(
    @InjectRepository(Balance)
    private readonly balanceRepository: Repository<Balance>,
  ) {}

  async create(createBalanceDto: CreateBalanceDto): Promise<Balance> {
    const balance = this.balanceRepository.create(createBalanceDto);
    return await this.balanceRepository.save(balance);
  }

  async findAll(): Promise<Balance[]> {
    return await this.balanceRepository.find();
  }

  async findOne(id: number): Promise<Balance> {
    return this.balanceRepository.findOne({ where: { id } });
  }

  async update(
    id: number,
    updateBalanceDto: CreateBalanceDto,
  ): Promise<Balance> {
    await this.balanceRepository.update(id, updateBalanceDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.balanceRepository.delete(id);
  }
}
