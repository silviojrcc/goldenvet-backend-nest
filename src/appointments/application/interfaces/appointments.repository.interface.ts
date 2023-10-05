import { Appointment } from 'src/appointments/domain/appointment.entity';
import { CreateAppointmentDto } from '../dto/create-appointment.dto';
import { User } from 'src/users/domain/user.entity';
import { UpdateAppointmentDto } from '../dto/update-appointment.dto';
import { PaginationDto } from 'src/common/pagination.dto';

export interface IAppointmentRepository {
  create(
    createAppointmentDto: CreateAppointmentDto,
    user: User,
  ): Promise<Appointment>;
  getAll(paginationDto: PaginationDto): Promise<Appointment[]>;
  findOne(id: string): Promise<Appointment>;
  findOneWithPatient(id: string): Promise<Appointment>;
  update(
    id: string,
    updateAppointmentDto: UpdateAppointmentDto,
  ): Promise<Appointment>;
  remove(id: string): Promise<Appointment>;
}
