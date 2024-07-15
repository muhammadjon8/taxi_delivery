import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateDriverDto {
  @ApiProperty({ example: 'driver name' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'surname example' })
  surname: string;
  @ApiProperty({ example: '23' })
  @IsNumber()
  age: number;
  @ApiProperty({ example: '+99893 089-41-82' })
  @IsString()
  phone: string;
  @ApiProperty({ example: 'photo example' })
  @IsString()
  photo: string;

  @ApiProperty({ example: 'example passport' })
  @IsString()
  passport: string;

  @ApiProperty({ example: 'prava passport' })
  @IsString()
  prava: string;

  @ApiProperty({ example: 'isActive description' })
  @IsString()
  isActive: boolean;

  @ApiProperty({ example: 'number description' })
  @IsString()
  total_balance: number;
}
