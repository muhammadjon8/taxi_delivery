import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ApiTags('Car')
@Entity("car")
export class Car {
  @ApiProperty({ example: 1, description: "Car 's ID" })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'model', description: "model's name" })
  @Column()
  model: string;

  @ApiProperty({ example: 'AB453985', description: "car's car_number" })
  @Column()
  car_number: string;

  @ApiProperty({
    example: 'purple',
    description: "car's color",
  })
  @Column()
  color: string;

  @ApiProperty({ description: 'photo photog' })
  @Column()
  photo: string;

  @ApiProperty({ description: 'car_type car' })
  @Column()
  car_type: string;

  @ApiProperty({ description: 'text-password car' })
  @Column()
  text_passport: string;
}
