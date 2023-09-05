import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateProductDto {
  @ApiProperty({
    description: 'Product Title (unique)',
    nullable: false,
    uniqueItems: true,
    minLength: 1,
    maxLength: 100,
  })
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  name: string;

  @ApiProperty({
    description: 'Product Description',
    nullable: true,
    minLength: 5,
    maxLength: 200,
  })
  @IsString()
  @IsOptional()
  @MinLength(5)
  @MaxLength(200)
  description: string;

  @ApiProperty({
    description: 'Product Price (float)',
    nullable: true,
  })
  @IsNumber()
  @IsPositive()
  @IsOptional()
  price: number;

  @ApiProperty({
    description: 'Product stock',
    nullable: false,
    minimum: 0,
  })
  @IsNumber()
  @IsInt()
  @IsPositive()
  @IsOptional()
  stock: number;

  @ApiProperty({
    description: 'Product slug',
    nullable: true,
    minimum: 0,
    uniqueItems: true,
  })
  @IsString()
  @IsOptional()
  slug?: string;

  @ApiProperty({
    description: 'Product url imagen',
    nullable: false,
    minimum: 0,
  })
  @IsOptional()
  @MinLength(5)
  @MaxLength(200)
  image: string;
}
