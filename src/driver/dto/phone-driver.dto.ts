import { ApiProperty } from '@nestjs/swagger';
import { IsPhoneNumber } from 'class-validator';

export class PhoneDriverDto {
  @ApiProperty({
    description: 'Toshkent is great city I Love Toshkent ❤',
    example: '+998930001100',
  })
  @IsPhoneNumber('UZ')
  phone: string;
}
