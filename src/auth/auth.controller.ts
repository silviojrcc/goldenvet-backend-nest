import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginDto } from './dto/login.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from 'src/users/entities/user.entity';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiResponse({
    status: 201,
    description: 'User has been successfully registered',
    type: User,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request: The request data is invalid',
  })
  @ApiResponse({
    status: 409,
    description: 'Conflict: Email is already registered',
  })
  @ApiResponse({
    status: 500,
    description:
      'Internal Server Error: An unexpected error occurred on the server',
  })
  @Post('register')
  register(@Body() registerUserDto: RegisterUserDto) {
    return this.authService.register(registerUserDto);
  }

  @ApiResponse({
    status: 200,
    description: 'Login successful: User has been authenticated',
    type: User,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request: The request data is invalid',
  })
  @ApiResponse({
    status: 401,
    description:
      'Unauthorized: Incorrect credentials or authentication is required to perform this action',
  })
  @ApiResponse({
    status: 500,
    description:
      'Internal Server Error: An unexpected error occurred on the server',
  })
  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
}
