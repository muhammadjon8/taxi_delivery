import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

Entity();
export class TaxiOrder {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  from_distict_id:number

  @Column()
  to_district_id:number

  @Column()
  date:Date

  @Column()
  user_id:number

  @Column()
  description:Text

  @Column()
  location_start:string
}
