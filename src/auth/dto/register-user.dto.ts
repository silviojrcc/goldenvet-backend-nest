import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  IsStrongPassword,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Role } from 'src/users/enums/user-role.enum';

export class RegisterUserDto {
  @ApiProperty({
    description: 'User email (unique)',
    nullable: false,
    uniqueItems: true,
  })
  @IsEmail()
  @IsString()
  email: string;

  @ApiProperty({
    description: 'User password',
    nullable: false,
  })
  @IsString()
  @IsStrongPassword()
  password: string;

  @ApiProperty({
    description: 'User name',
    nullable: false,
    maxLength: 50,
  })
  @IsString()
  @MinLength(1)
  @MaxLength(50)
  name: string;

  @ApiProperty({
    description: 'User surname',
    nullable: false,
    maxLength: 50,
  })
  @IsString()
  @MinLength(1)
  @MaxLength(50)
  surname: string;

  @ApiProperty({
    description: 'User roole',
    nullable: false,
  })
  @IsEnum(Role)
  @IsOptional()
  role?: Role;
}
