import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { PaginationDto } from 'src/common/pagination.dto';
import { CreateAppointmentDto } from '../dto/create-appointment.dto';
import { UpdateAppointmentDto } from '../dto/update-appointment.dto';
import { User } from 'src/users/domain/user.entity';
import { Appointment } from '../../domain/appointment.entity';

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectRepository(Appointment)
    private readonly appointmentRepository: Repository<Appointment>,
  ) {}

  async create(createAppointmentDto: CreateAppointmentDto, user: User) {
    const appointment = await this.appointmentRepository.create({
      ...createAppointmentDto,
      patient: user,
    });
    delete appointment.patient;
    return this.appointmentRepository.save(appointment);
  }

  async findAll(paginationDto: PaginationDto) {
    try {
      const { limit = 10, offset = 0 } = paginationDto;
      return await this.appointmentRepository.find({
        take: limit,
        skip: offset,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async findOne(id: string) {
    try {
      const appointment = await this.appointmentRepository.findOneBy({ id });
      if (!appointment) throw new NotFoundException('Appointment not found');
      return appointment;
    } catch (error) {
      console.log(error);
    }
  }

  async findOneWithPatient(id: string) {
    return await this.appointmentRepository.findOne({
      where: { id },
      relations: ['patient'],
    });
  }

  async update(id: string, updateAppointmentDto: UpdateAppointmentDto) {
    try {
      const appointment = await this.findOne(id);
      return await this.appointmentRepository.save({
        ...appointment,
        ...updateAppointmentDto,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async remove(id: string) {
    try {
      const appointment = await this.findOne(id);
      return await this.appointmentRepository.remove(appointment);
    } catch (error) {
      console.log(error);
    }
  }
}
