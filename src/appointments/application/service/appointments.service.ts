import { Injectable, NotFoundException } from '@nestjs/common';

import { PaginationDto } from 'src/common/pagination.dto';
import { CreateAppointmentDto } from '../dto/create-appointment.dto';
import { UpdateAppointmentDto } from '../dto/update-appointment.dto';
import { User } from 'src/users/domain/user.entity';
import { AppointmentRepository } from 'src/appointments/infrastructure/database/appointment.repository';

@Injectable()
export class AppointmentsService {
  constructor(private readonly appointmentRepository: AppointmentRepository) {}

  async create(createAppointmentDto: CreateAppointmentDto, user: User) {
    return this.appointmentRepository.create(createAppointmentDto, user);
  }

  async findAll(paginationDto: PaginationDto) {
    try {
      const { limit = 10, offset = 0 } = paginationDto;
      return await this.appointmentRepository.getAll({
        limit,
        offset,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async findOne(id: string) {
    try {
      const appointment = await this.appointmentRepository.findOne(id);
      if (!appointment) throw new NotFoundException('Appointment not found');
      return appointment;
    } catch (error) {
      console.log(error);
    }
  }

  async findOneWithPatient(id: string) {
    return await this.appointmentRepository.findOneWithPatient(id);
  }

  async update(id: string, updateAppointmentDto: UpdateAppointmentDto) {
    try {
      return await this.appointmentRepository.update(id, updateAppointmentDto);
    } catch (error) {
      console.log(error);
    }
  }

  async remove(id: string) {
    try {
      return await this.appointmentRepository.remove(id);
    } catch (error) {
      console.log(error);
    }
  }
}
