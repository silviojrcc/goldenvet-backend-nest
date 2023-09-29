import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsString } from 'class-validator';

export class CreateAppointmentDto {
  @ApiProperty({
    description: 'Visit detail',
    nullable: false,
  })
  @IsString()
  visitDetail: string;

  @ApiProperty({
    description: 'Appointment date',
    nullable: false,
  })
  @IsDateString()
  appointmentDate: Date;
}
