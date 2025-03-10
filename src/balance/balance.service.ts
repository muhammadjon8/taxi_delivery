import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Balance } from './entities/balance.entity';

@Injectable()
export class BalanceService {
  constructor(
    @InjectRepository(Balance)
    private readonly balanceRepository: Repository<Balance>,
  ) {}

  async create(balance: Balance): Promise<Balance> {
    return this.balanceRepository.save(balance);
  }

  async findAll(): Promise<Balance[]> {
    return this.balanceRepository.find();
  }

  async findOne(id: number): Promise<Balance> {
    return this.balanceRepository.findOne({ where: { id } });
  }

  async update(id: number, balance: Balance): Promise<Balance> {
    await this.balanceRepository.update(id, balance);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.balanceRepository.delete(id);
  }
}
