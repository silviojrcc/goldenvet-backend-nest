import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsStrongPassword } from 'class-validator';

export class LoginDto {
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
}
