import { ApiProperty } from '@nestjs/swagger'
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity('car_driver')
export class CarDriver {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'driver_id', description: 'driver_example' })
  @Column()
  driver_id: number;

  @ApiProperty({ example: 'car_id example', description: 'car_id example' })
  @Column()
  car_id: number;
}
