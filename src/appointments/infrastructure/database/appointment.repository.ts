import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { IAppointmentRepository } from 'src/appointments/application/interfaces/appointments.repository.interface';
import { Appointment } from 'src/appointments/domain/appointment.entity';
import { CreateAppointmentDto } from 'src/appointments/application/dto/create-appointment.dto';
import { PaginationDto } from 'src/common/pagination.dto';
import { UpdateAppointmentDto } from 'src/appointments/application/dto/update-appointment.dto';
import { User } from 'src/users/domain/user.entity';

@Injectable()
export class AppointmentRepository implements IAppointmentRepository {
  constructor(
    @InjectRepository(Appointment)
    private readonly appointmentRepository: Repository<Appointment>,
  ) {}

  async create(
    createAppointmentDto: CreateAppointmentDto,
    user: User,
  ): Promise<Appointment> {
    const appointment = await this.appointmentRepository.create({
      ...createAppointmentDto,
      patient: user,
    });
    delete appointment.patient;
    return this.appointmentRepository.save(appointment);
  }

  async getAll(paginationDto: PaginationDto): Promise<Appointment[]> {
    return this.appointmentRepository.find({
      take: paginationDto.limit,
      skip: paginationDto.offset,
    });
  }

  async findOne(id: string): Promise<Appointment> {
    return this.appointmentRepository.findOneBy({ id });
  }

  async findOneWithPatient(id: string): Promise<Appointment> {
    return this.appointmentRepository.findOne({
      where: { id },
      relations: ['patient'],
    });
  }

  async update(
    id: string,
    updateAppointmentDto: UpdateAppointmentDto,
  ): Promise<Appointment> {
    const appointment = await this.findOne(id);
    return await this.appointmentRepository.save({
      ...appointment,
      ...updateAppointmentDto,
    });
  }

  async remove(id: string): Promise<Appointment> {
    const appointment = await this.findOne(id);
    return await this.appointmentRepository.remove(appointment);
  }
}
