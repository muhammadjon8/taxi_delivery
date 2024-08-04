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
    description: 'The name of the user',
    example: 'John Doe',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'The phone number of the user in Uzbekistan format',
    example: '+998901234567',
  })
  @IsString()
  @IsNotEmpty()
  @IsPhoneNumber('UZ')
  phone_number: string;

  @ApiProperty({
    description: 'The password for the user account. It should be strong.',
    example: 'P@ssw0rd!',
  })
  @IsStrongPassword()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    description:
      'Confirmation of the password. It should match the password field.',
    example: 'P@ssw0rd!',
  })
  @IsNotEmpty()
  confirm_password: string;

  @ApiProperty({
    description: 'Indicates if the user account is active.',
    example: true,
  })
  @IsNotEmpty()
  is_active: boolean;
}
