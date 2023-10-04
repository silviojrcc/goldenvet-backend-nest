import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginDto } from './dto/login.dto';
import { UsersService } from '../users/users.service';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerUserDto: RegisterUserDto) {
    const { password, ...userData } = registerUserDto;

    const user = await this.userService.create({
      ...userData,
      password: bcrypt.hashSync(password, 10),
    });

    delete user.password;

    return {
      ...user,
      token: this.getJwtToken({ id: user.id }),
    };
  }

  async login(loginDto: LoginDto) {
    const { password } = loginDto;

    const user = await this.userService.findOneForLogin(loginDto);
    if (!user) throw new UnauthorizedException('Email or password is wrong');

    if (!bcrypt.compareSync(password, user.password))
      throw new UnauthorizedException('Email or password is wrong');

    delete user.password;

    return {
      ...user,
      token: this.getJwtToken({ id: user.id }),
    };
  }

  private getJwtToken(payload: JwtPayload) {
    const token = this.jwtService.sign(payload);
    return token;
  }
}
