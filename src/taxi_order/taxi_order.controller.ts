import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateTaxiOrderDto } from './dto/create-taxi_order.dto';
import { UpdateTaxiOrderDto } from './dto/update-taxi_order.dto';
import { TaxiOrderService } from './taxi_order.service';

@ApiTags('taxi-order')
@Controller('taxi-order')
export class TaxiOrderController {
  constructor(private readonly taxiOrderService: TaxiOrderService) {}

  @Post()
  @ApiOperation({ description: 'Yangi taxi buyurtmasi yaratish' })
  @ApiResponse({
    status: 201,
    description: 'Taxi buyurtmasi muvaffaqiyatli yaratildi.',
  })
  @ApiResponse({ status: 400, description: 'Xato soʻrov.' })
  create(@Body() createTaxiOrderDto: CreateTaxiOrderDto) {
    return this.taxiOrderService.create(createTaxiOrderDto);
  }

  @Get()
  @ApiOperation({ description: 'Barcha taxi buyurtmalarini olish' })
  @ApiResponse({
    status: 200,
    description: 'Barcha taxi buyurtmalari qaytarildi.',
  })
  findAll() {
    return this.taxiOrderService.findAll();
  }

  @Get(':id')
  @ApiOperation({ description: 'ID boʻyicha taxi buyurtmasini olish' })
  @ApiResponse({
    status: 200,
    description: 'Berilgan ID boʻyicha taxi buyurtmasi qaytarildi.',
  })
  @ApiResponse({ status: 404, description: 'Taxi buyurtmasi topilmadi.' })
  findOne(@Param('id') id: string) {
    return this.taxiOrderService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ description: 'ID boʻyicha taxi buyurtmasini yangilash' })
  @ApiResponse({
    status: 200,
    description: 'Taxi buyurtmasi muvaffaqiyatli yangilandi.',
  })
  @ApiResponse({ status: 404, description: 'Taxi buyurtmasi topilmadi.' })
  update(
    @Param('id') id: string,
    @Body() updateTaxiOrderDto: UpdateTaxiOrderDto,
  ) {
    return this.taxiOrderService.update(+id, updateTaxiOrderDto);
  }

  @Delete(':id')
  @ApiOperation({ description: 'ID boʻyicha taxi buyurtmasini oʻchirish' })
  @ApiResponse({
    status: 200,
    description: 'Taxi buyurtmasi muvaffaqiyatli oʻchirildi.',
  })
  @ApiResponse({ status: 404, description: 'Taxi buyurtmasi topilmadi.' })
  remove(@Param('id') id: string) {
    return this.taxiOrderService.remove(+id);
  }
}
