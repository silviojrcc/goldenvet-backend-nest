import { Module } from '@nestjs/common';
import { AppointmentsService } from './application/service/appointments.service';
import { AppointmentsController } from './interface/appointments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Appointment } from './domain/appointment.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [AppointmentsController],
  providers: [AppointmentsService],
  imports: [TypeOrmModule.forFeature([Appointment]), AuthModule],
})
export class AppointmentsModule {}
