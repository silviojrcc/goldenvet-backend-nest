import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/users/entities/user.entity';
import {
  BeforeInsert,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('appointment')
export class Appointment {
  @ApiProperty({
    example: '0fe45f70-1e64-45a6-81a2-95d04f9e6e08',
    description: 'Appointment Id',
    uniqueItems: true,
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: 'Consulta de vacunación',
    description: 'Appointment description',
  })
  @Column({ type: 'text', name: 'visit_detail' })
  visitDetail: string;

  @ApiProperty({
    example: '2022-01-01 00:00:00',
    description: 'Appointment date',
  })
  @Column({ type: 'date', name: 'appointment_date' })
  appointmentDate: Date;

  @ApiProperty({
    example: '2022-01-01 00:00:00',
    description: 'Created date',
  })
  @Column({ type: 'date', name: 'created_at' })
  createdAt: Date;

  @ApiProperty({
    example: '0fe45f70-1e64-45a6-81a2-95d04f9e6e08',
    description: 'Patient Id',
  })
  @ManyToOne(() => User, (user) => user.appointments)
  patient: User;

  @BeforeInsert()
  setCreatedAt() {
    this.createdAt = new Date();
  }
}
