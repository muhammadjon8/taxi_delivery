import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateBalanceDto {
  @ApiProperty({ example: 2, description: 'Amount in the balance' })
  @IsString()
  @IsNotEmpty()
  amount: string;

  @ApiProperty({
    example: '10.07.2024',
    description: 'Date of transfer',
  })
  @IsString()
  @IsNotEmpty()
  transfer_date: string;

  @ApiProperty({
    example: true,
    description: 'Type of transfer',
  })
  @IsBoolean()
  @IsNotEmpty()
  transfer_type: boolean;

  @ApiProperty({
    example: 'AA6470311',
    description: 'Id of the driver',
  })
  @IsString()
  @IsOptional()
  driver_id?: string;
}
