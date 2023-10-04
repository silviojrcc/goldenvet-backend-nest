import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { AppointmentsService } from '../../application/service/appointments.service';
import { ValidRoles } from 'src/auth/application/interfaces/valid-roles.interface';

@Injectable()
export class IsAppointmentCreatorGuard implements CanActivate {
  constructor(private readonly appointmentService: AppointmentsService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const { user, params } = context.switchToHttp().getRequest();

    if (!params) throw new BadRequestException('Appointment id not found');

    if (!user) throw new UnauthorizedException('User not found in request');

    if (user.role === ValidRoles.ADMIN) return true;

    const { id: appointmentId } = params;
    const appointment = await this.searchAppointment(appointmentId);

    if (!appointment) throw new NotFoundException('Appointment not found');

    if (appointment.patient.id !== user.id)
      throw new UnauthorizedException(
        'User is not the creator of this appointment',
      );

    return true;
  }

  private async searchAppointment(appointmentId: string) {
    return await this.appointmentService.findOneWithPatient(appointmentId);
  }
}
