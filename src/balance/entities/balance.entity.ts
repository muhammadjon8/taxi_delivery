import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ApiTags('balances')
@Entity()
export class Balance {
  @ApiProperty({ example: 1, description: 'Balance ID' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 2, description: 'amount in the balance' })
  @Column()
  amount: string;

  @ApiProperty({
    example: '10.07.2024',
    description: 'Date of transfer',
  })
  @Column()
  transfer_date: string;

  @ApiProperty({
    example: '10.07.2024',
    description: 'Date of transfer',
  })
  @Column()
  transfer_type: boolean;

  @ApiProperty({
    example: 'AA6470311',
    description: 'Id of the driver',
  })
  @Column({ nullable: true })
  driver_id: string;
}
