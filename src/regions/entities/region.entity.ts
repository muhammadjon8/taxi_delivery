import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Region {
  @ApiProperty({ example: 1, description: 'Yagona identifikatsiya raqami' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Toshkent', description: 'Hudud nomi' })
  @Column()
  name: string;
}
