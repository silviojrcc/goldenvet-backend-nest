import { Injectable } from '@nestjs/common';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  register(registerUserDto: RegisterUserDto) {
    return 'This action adds a new auth';
  }

  login(loginDto: LoginDto) {
    return `This action updates a # auth`;
  }
}
