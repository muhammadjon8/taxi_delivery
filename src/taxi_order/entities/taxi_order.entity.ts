import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('taxi-order')
export class TaxiOrder {
  @ApiProperty({ example: 1, description: 'Yagona identifikatsiya raqami' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 1, description: 'Joʻnash tumani ID' })
  @Column()
  from_district_id: number;

  @ApiProperty({ example: 2, description: 'Boriladigan tumani ID' })
  @Column()
  to_district_id: number;

  @ApiProperty({
    example: '2023-07-01T00:00:00.000Z',
    description: 'Buyurtma sanasi',
  })
  @Column()
  date: Date;

  @ApiProperty({ example: 1, description: 'Foydalanuvchi ID' })
  @Column({ nullable: true })
  user_id: number;

  @ApiProperty({ example: 'Description text', description: 'Qoʻshimcha izoh' })
  @Column()
  description: string;

  @ApiProperty({ example: 'Start location', description: 'Boshlanish joyi' })
  @Column()
  location_start: string;

  @ApiProperty({ example: '2h', description: 'Davomiyligi' })
  @Column()
  duration: string;
  @ApiProperty({ example: '550km', description: 'Masofasi' })
  @Column()
  distance: string;
}
