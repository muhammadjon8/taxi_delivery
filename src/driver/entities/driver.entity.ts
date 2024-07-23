import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ApiTags('Driver')
@Entity('driver')
export class Driver {
  @ApiProperty({ example: 1, description: "Driver's ID" })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: "Driver's name", description: "driver's name" })
  @Column()
  name: string;

  // @ApiProperty({ example: 'Surname example', description: 'surname' })
  // @Column()
  // surname: string;

  @ApiProperty({
    example: '25',
    description: 'age description',
  })
  @Column('int')
  age: number;

  @ApiProperty({ description: 'phone description' })
  @Column()
  phone: string;

  @ApiProperty({ description: 'photo description' })
  @Column()
  photo: string;

  @ApiProperty({ description: 'passport description' })
  @Column()
  passport: string;

  @ApiProperty({ description: 'prava description' })
  @Column()
  prava: string;

  @ApiProperty({ description: 'isActive description' })
  @Column('boolean')
  isActive: boolean;

  @ApiProperty({ description: 'total_balance description' })
  @Column('float')
  total_balance: number;
}
