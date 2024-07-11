import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ApiTags('users')
@Entity()
export class User {
  @ApiProperty({ example: 1, description: 'User ID' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: 'Nizomiddin Azam',
    description: "User's full_name",
  })
  @Column()
  name: string;

  @ApiProperty({
    example: 'hell0w0r1d',
    description: "User's password",
  })
  @Column()
  password: string;

  @ApiProperty({ example: '+998901006706', description: "User's phone number" })
  @Column({ unique: true })
  phone_number: string;

  @ApiProperty({ description: "User's activeness" })
  @Column({ default: true })
  isActive: boolean;

  @ApiProperty({
    example: 'kjnuied8934h90f387489734bf3f7b73f',
    description: "User's refresh token",
  })
  @Column({ nullable: true })
  refreshToken: string;
}
