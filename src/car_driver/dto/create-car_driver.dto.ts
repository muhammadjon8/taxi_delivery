import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateCarDriverDto {
  @ApiProperty({
    description: 'The driver of the region',
    example: 'Tashkent',
  })
  @IsNumber()
  @IsNotEmpty()
  driver_id: number;

  @ApiProperty({
    description: 'The name of the car',
    example: 'carid',
  })
  @IsNumber()
  @IsNotEmpty()
  car_id: number;
}

