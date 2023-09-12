import { Injectable } from '@nestjs/common';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginDto } from './dto/login.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UsersService) {}
  register(registerUserDto: RegisterUserDto) {
    return 'This action adds a new auth';
  }

  login(loginDto: LoginDto) {
    return `This action updates a # auth`;
  }
}
