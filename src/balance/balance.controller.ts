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
import { CreateBalanceDto } from './dto/create-balance.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('balances')
@Controller('balances')
export class BalanceController {
  constructor(private readonly balanceService: BalanceService) {}

  @ApiOperation({ summary: 'Create a new balance' })
  @ApiResponse({
    status: 201,
    description: 'The balance has been successfully created.',
    type: Balance,
  })
  @Post()
  async create(@Body() createBalanceDto: CreateBalanceDto): Promise<Balance> {
    return this.balanceService.create(createBalanceDto);
  }

  @ApiOperation({ summary: 'Get all balances' })
  @ApiResponse({
    status: 200,
    description: 'Retrieved all balances successfully.',
    type: [Balance],
  })
  @Get()
  async findAll(): Promise<Balance[]> {
    return this.balanceService.findAll();
  }

  @ApiOperation({ summary: 'Get a balance by ID' })
  @ApiResponse({
    status: 200,
    description: 'Retrieved the balance successfully.',
    type: Balance,
  })
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Balance> {
    return this.balanceService.findOne(id);
  }

  @ApiOperation({ summary: 'Update a balance by ID' })
  @ApiResponse({
    status: 200,
    description: 'The balance has been successfully updated.',
    type: Balance,
  })
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateBalanceDto: CreateBalanceDto,
  ): Promise<Balance> {
    return this.balanceService.update(id, updateBalanceDto);
  }

  @ApiOperation({ summary: 'Delete a balance by ID' })
  @ApiResponse({
    status: 200,
    description: 'The balance has been successfully deleted.',
  })
  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.balanceService.remove(id);
  }
}
