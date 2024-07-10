import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsNumber, isString, IsString } from 'class-validator';

export class CreateDeliveryOrderDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  from_district_id: number;
  @ApiProperty({ example: 2 })
  @IsNumber()
  to_district_id: number;
  @ApiProperty({ example: '2024-09-09' })
  @Type(() => Date)
  date: Date;
  @ApiProperty({ example: '12:00' })
  @IsString()
  time: string;
  @ApiProperty({ example: 'Mebel' })
  @IsString()
  load_name: string;

  @ApiProperty({ example: 10 })
  @IsNumber()
  load_weight: number;

  @ApiProperty({ example: '3kvm' })
  @IsString()
  load_capacity: string;

  @ApiProperty({
    example: 'Mebel jonatish kerak, oynasi bor, sinmmasligi kerak',
  })
  @IsString()
  description: string;

  @ApiProperty({ example: 'Ahmad Qurbonov' })
  @IsString()
  recipient_name: string;

  @ApiProperty({ example: '+9989312345678' })
  @IsString()
  recipient_phone: string;

  @ApiProperty({ example: 'Tashkent, Sergili, 85A' })
  @IsString()
  location_start: string;

  @ApiProperty({ example: 'pochta', description: 'pochta yoki yuk' })
  @IsString()
  type: string;
}
