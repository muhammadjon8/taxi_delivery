import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

Entity("region");
export class Region {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  longitude: number;

  @Column()
  latitude: number;
}
