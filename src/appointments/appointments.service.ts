import { Injectable } from '@nestjs/common';
import { PaginationDto } from 'src/common/pagination.dto';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AppointmentsService {
  create(createAppointmentDto: CreateAppointmentDto, user: User) {
    return 'This action adds a new appointment';
  }

  findAll(paginationDto: PaginationDto) {
    return `This action returns all appointments`;
  }

  findOne(id: string) {
    return `This action returns a #${id} appointment`;
  }

  update(id: string, updateAppointmentDto: UpdateAppointmentDto) {
    return `This action updates a #${id} appointment`;
  }

  remove(id: string) {
    return `This action removes a #${id} appointment`;
  }
}
