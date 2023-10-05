import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AppointmentsService } from '../application/service/appointments.service';
import { CreateAppointmentDto } from '../application/dto/create-appointment.dto';
import { UpdateAppointmentDto } from '../application/dto/update-appointment.dto';
import { GetUser } from 'src/auth/application/decorators/get-user.decorator';
import { User } from 'src/users/domain/user.entity';
import { PaginationDto } from 'src/common/pagination.dto';
import { Auth } from 'src/auth/application/decorators/auth.decorator';
import { IsAppointmentCreatorGuard } from '../infrastructure/guards/is-appointment-creator.guard';
import { ValidRoles } from 'src/auth/application/interfaces/valid-roles.interface';

@ApiTags('Appointments')
@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @Auth(ValidRoles.USER)
  @Post()
  create(
    @Body() createAppointmentDto: CreateAppointmentDto,
    @GetUser() user: User,
  ) {
    console.log(user);
    return this.appointmentsService.create(createAppointmentDto, user);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.appointmentsService.findAll(paginationDto);
  }

  @UseGuards(IsAppointmentCreatorGuard)
  @Auth()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.appointmentsService.findOne(id);
  }

  @UseGuards(IsAppointmentCreatorGuard)
  @Auth()
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAppointmentDto: UpdateAppointmentDto,
  ) {
    return this.appointmentsService.update(id, updateAppointmentDto);
  }

  @UseGuards(IsAppointmentCreatorGuard)
  @Auth()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.appointmentsService.remove(id);
  }
}
