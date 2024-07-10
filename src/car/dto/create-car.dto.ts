import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateCarDto {
  @ApiProperty({ example: 'lasetti' })
  @IsString()
  model: string;

  @ApiProperty({ example: 'AB659111' })
  car_number: string;
  @ApiProperty({ example: 'red-and purlpe' })
  @IsString()
  color: string;
  @ApiProperty({ example: '/12.jpg-girl' })
  @IsString()
  photo: string;
  @ApiProperty({ example: 'deleveries' })
  @IsString()
  car_type: string;

  @ApiProperty({ example: 'example text-passport' })
  @IsString()
  text_passport: string;
}
