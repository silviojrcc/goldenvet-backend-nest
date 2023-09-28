import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Role } from '../enums/user-role.enum';
import { Appointment } from 'src/appointments/entities/appointment.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', {
    unique: true,
  })
  email: string;

  @Column('text', {
    select: false,
  })
  password: string;

  @Column('text')
  name: string;

  @Column('text')
  surname: string;

  @Column({ type: 'enum', enum: Role, default: Role.USER })
  role: Role;

  @Column('bool', {
    default: true,
  })
  isActive: boolean;

  @OneToMany(() => Appointment, (appointment) => appointment.patient)
  appointments: Appointment;

  @BeforeInsert()
  @BeforeUpdate()
  checkFields() {
    this.email = this.email.toLowerCase().trim();
    this.name = this.name.trim();
    this.surname = this.surname.trim();
  }
}
