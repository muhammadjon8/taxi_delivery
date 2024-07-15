import { PartialType } from '@nestjs/mapped-types';
import { CreateBalanceDto } from './create-balance.dto';

export class UpdateUserDto extends PartialType(CreateBalanceDto) {}
