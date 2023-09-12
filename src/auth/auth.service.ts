import { Injectable } from '@nestjs/common';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginDto } from './dto/login.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UsersService) {}
  async register(registerUserDto: RegisterUserDto) {
    const { password, ...userData } = registerUserDto;
    const user = await this.userService.create({
      ...userData,
      password: bcrypt.hashSync(password, 10),
    });
    return user;
  }

  login(loginDto: LoginDto) {
    return `This action updates a # auth`;
  }
}
