import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('otp')
export class Otp {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  otp: string;

  @Column()
  expiration_time: Date;

  @Column()
  check: string;

  @Column({ default: false })
  verified: boolean;
}
