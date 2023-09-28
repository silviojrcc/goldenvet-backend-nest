import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsString } from 'class-validator';

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
  @IsDate()
  appointmentDate: Date;
}
