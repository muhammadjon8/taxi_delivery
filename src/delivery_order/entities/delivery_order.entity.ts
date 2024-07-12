import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity('delivery_order')
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
  @Column({ nullable: true })
  user_id: number;
  @Column({ nullable: true })
  distance: string;
  @Column({ nullable: true })
  duration: string;
}
