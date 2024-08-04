import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ApiTags('Driver')
@Entity('driver')
export class Driver {
  @ApiProperty({ example: 1, description: "Driver's ID" })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: "Driver's name", description: "Driver's name" })
  @Column()
  name: string;

  @ApiProperty({ example: '25', description: 'Driver’s age' })
  @Column('int')
  age: number;

  @ApiProperty({ description: 'Driver’s phone number' })
  @Column()
  phone: string;

  @ApiProperty({ description: 'Driver’s photo' })
  @Column()
  photo: string;

  @ApiProperty({ description: 'Driver’s passport information' })
  @Column()
  passport: string;

  @ApiProperty({ description: 'Driver’s prava (license) information' })
  @Column()
  prava: string;

  @ApiProperty({ description: 'Driver’s active status' })
  @Column('boolean')
  isActive: boolean;

  @ApiProperty({ description: 'Driver’s total balance' })
  @Column('float')
  total_balance: number;

  @ApiProperty({ description: 'Driver’s password' })
  @Column()
  password: string;

  @ApiProperty({ description: 'Driver’s refresh token' })
  @Column({ nullable: true })
  refreshToken?: string; // Add this line to include the refreshToken field
}
