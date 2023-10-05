import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from '../../domain/user.entity';
import { LoginDto } from 'src/auth/application/dto/login.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  private logger = new Logger('UserService');

  async create(createUserDto: CreateUserDto) {
    try {
      const user = this.userRepository.create(createUserDto);
      await this.userRepository.save(user);
      return user;
    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  async findAll() {
    try {
      return await this.userRepository.find();
    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  async findOne(id: string) {
    try {
      const user = await this.userRepository.findOneBy({ id });
      return user;
    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user: ${updateUserDto}`;
  }

  remove(id: string) {
    return `This action removes a #${id} user`;
  }

  async findOneForLogin(loginDto: LoginDto) {
    const { email } = loginDto;
    const user = await this.userRepository.findOne({
      where: { email },
      select: { email: true, password: true, id: true },
    });
    return user;
  }

  private handleDBErrors(error: any) {
    if (error.code === '23505') throw new BadRequestException(error.detail);

    this.logger.error(error);

    throw new InternalServerErrorException(
      'Unexpected error, check server logs',
    );
  }
}
