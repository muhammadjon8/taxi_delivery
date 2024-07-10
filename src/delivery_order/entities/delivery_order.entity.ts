import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { Column, PrimaryGeneratedColumn } from 'typeorm';

export class DeliveryOrder {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  from_district_id: number;
  @Column()
  to_district_id: number;
  @Column()
  date: Date;
  @Column()
  time: string;
  @Column()
  load_name: string;
  @Column()
  load_weight: number;
  @Column()
  load_capacity: string;
  @Column()
  description: string;
  @Column()
  recipient_name: string;
  @Column()
  recipient_phone: string;
  @Column()
  location_start: string;
  @Column()
  type: string;
}
