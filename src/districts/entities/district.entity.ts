import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class District {
  @ApiProperty({ example: 1, description: 'Yagona identifikatsiya raqami' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Chilonzor', description: 'Tuman nomi' })
  @Column()
  name: string;

  @ApiProperty({ example: 1, description: 'Hudud ID' })
  @Column()
  region_id: number;
}
