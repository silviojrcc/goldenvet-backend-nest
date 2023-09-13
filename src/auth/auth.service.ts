import { Injectable, UnauthorizedException } from '@nestjs/common';
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
    delete user.password;
    return user;
  }

  async login(loginDto: LoginDto) {
    const { password } = loginDto;

    const user = await this.userService.findOneForLogin(loginDto);
    if (!user) throw new UnauthorizedException('Email or password is wrong');

    if (!bcrypt.compareSync(password, user.password))
      throw new UnauthorizedException('Email or password is wrong');

    delete user.password;
    return user;
  }
}
