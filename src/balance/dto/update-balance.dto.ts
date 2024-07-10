import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-balance.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {}
