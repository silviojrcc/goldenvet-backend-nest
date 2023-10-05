import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './application/service/users.service';
import { UsersController } from './interface/users.controller';
import { User } from './domain/user.entity';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [TypeOrmModule.forFeature([User])],
  exports: [UsersService, TypeOrmModule],
})
export class UsersModule {}
