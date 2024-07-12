import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity('car_driver')
export class CarDriver {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  driver_id: number;

  @Column()
  car_id: number;
}
