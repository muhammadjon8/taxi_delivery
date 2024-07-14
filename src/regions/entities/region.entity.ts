import { Column, Decimal128, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('region')
export class Region {
  @ApiProperty({ example: 1, description: 'Yagona identifikatsiya raqami' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Toshkent', description: 'Hudud nomi' })
  @Column()
  name: string;
}
