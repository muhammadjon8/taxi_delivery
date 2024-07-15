import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'Name of the user',
    example: 'John Doe',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Phone number of the user in Uzbekistan format',
    example: '+998911234567',
  })
  @IsString()
  @IsNotEmpty()
  @IsPhoneNumber('UZ')
  phone_number: string;

  @ApiProperty({
    description: 'Password for the user account',
    example: 'StrongP@ssw0rd!',
  })
  @IsStrongPassword()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    description: 'Password confirmation for the user account',
    example: 'StrongP@ssw0rd!',
  })
  @IsNotEmpty()
  confirm_password: string;

  @ApiProperty({
    description: 'Indicates if the user account is active',
    example: true,
  })
  @IsNotEmpty()
  is_active: boolean;
}
