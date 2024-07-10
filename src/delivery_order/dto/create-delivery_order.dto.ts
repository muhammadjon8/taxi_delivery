import { IsDate, IsNumber, isString, IsString } from 'class-validator';
import { Timestamp } from 'rxjs';

export class CreateDeliveryOrderDto {
  @IsNumber()
  from_district_id: number;
  @IsNumber()
  to_district_id: number;
  @IsDate()
  date: Date;
  time: string;
  @IsString()
  load_name: string;
  @IsString()
  load_weight: number;
  @IsString()
  load_capacity: number;
  @IsString()
  description: string;
  @IsString()
  recipient_name: string;
  @IsString()
  recipient_phone: string;
  @IsString()
  location_start: string;
  @IsString()
  type: string;
}
