import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CarDriver {
  @ApiProperty({ example: 2, description: 'driver  in the balance' })
  @IsNumber()
  @IsNotEmpty()
  driver_id: number;

  @ApiProperty({ example: 2, description: 'driver  in the balance' })
  @IsNumber()
  @IsNotEmpty()
  car_id: number;
}
