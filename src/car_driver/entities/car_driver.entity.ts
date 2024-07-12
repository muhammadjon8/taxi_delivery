import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity('delivery_order')
export class CarDriver {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  driver_id: number;

  @Column()
  car_id: number;
}
