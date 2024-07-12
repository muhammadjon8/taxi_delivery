import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RegionsService } from './regions.service';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('regions')
@Controller('region')
export class RegionsController {
  constructor(private readonly regionsService: RegionsService) {}

  @ApiOperation({ description: 'Yangi hudud yaratish' })
  // @ApiResponse({
  //   status: 201,
  //   description: 'Hudud muvaffaqiyatli yaratildi.',
  // })
  // @ApiResponse({ status: 400, description: 'Xato soʻrov.' })
  @Post()
  create(@Body() createRegionDto: CreateRegionDto) {
    this.regionsService.create(createRegionDto);
  }

  @Get()
  @ApiOperation({ description: 'Barcha hududlarni olish' })
  @ApiResponse({ status: 200, description: 'Barcha hududlar qaytarildi.' })
  findAll() {
    return this.regionsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ description: 'ID boʻyicha hududni olish' })
  @ApiResponse({
    status: 200,
    description: 'Berilgan ID boʻyicha hudud qaytarildi.',
  })
  @ApiResponse({ status: 404, description: 'Hudud topilmadi.' })
  findOne(@Param('id') id: string) {
    return this.regionsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ description: 'ID boʻyicha hududni yangilash' })
  @ApiResponse({
    status: 200,
    description: 'Hudud muvaffaqiyatli yangilandi.',
  })
  @ApiResponse({ status: 404, description: 'Hudud topilmadi.' })
  update(@Param('id') id: string, @Body() updateRegionDto: UpdateRegionDto) {
    return this.regionsService.update(+id, updateRegionDto);
  }

  @Delete(':id')
  @ApiOperation({ description: 'ID boʻyicha hududni oʻchirish' })
  @ApiResponse({
    status: 200,
    description: 'Hudud muvaffaqiyatli oʻchirildi.',
  })
  @ApiResponse({ status: 404, description: 'Hudud topilmadi.' })
  remove(@Param('id') id: string) {
    return this.regionsService.remove(+id);
  }
}
