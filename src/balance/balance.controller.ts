import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BalanceService } from './balance.service';
import { Balance } from './entities/balance.entity';
import { ApiTags } from '@nestjs/swagger'

@ApiTags('balance')
@Controller('balances')
export class BalanceController {
  constructor(private readonly balanceService: BalanceService) {}

  @Post()
  async create(@Body() balance: Balance): Promise<Balance> {
    return this.balanceService.create(balance);
  }

  @Get()
  async findAll(): Promise<Balance[]> {
    return this.balanceService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Balance> {
    return this.balanceService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() balance: Balance,
  ): Promise<Balance> {
    return this.balanceService.update(id, balance);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.balanceService.remove(id);
  }
}
