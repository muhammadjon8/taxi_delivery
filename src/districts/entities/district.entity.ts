import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('district')
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
