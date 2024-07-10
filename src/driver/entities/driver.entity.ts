import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ApiTags('Driver')
@Entity()
export class Driver {

  @ApiProperty({ example: 1, description: "Car 's ID" })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: "Driver's name", description: "driver's name" })
  @Column()
  name: string;

  @ApiProperty({ example: 'Suraname example', description: 'surname' })
  @Column()
  surname: string;

  @ApiProperty({
    example: '25',
    description: 'age description',
  })
  @Column()
  age: number;

  @ApiProperty({ description: 'phone desctiption' })
  @Column()
  phone: string;

  @ApiProperty({ description: 'photo car' })
  @Column()
  photo: string;

  @ApiProperty({ description: 'password description' })
  @Column()
  passport: string;

  @ApiProperty({ description: 'prava description' })
  @Column()
  prava: string;

  @ApiProperty({ description: 'isActive description' })
  @Column()
  isActive: boolean;

  @ApiProperty({ description: 'total_balance description' })
  @Column()
  total_balance: number;
}
