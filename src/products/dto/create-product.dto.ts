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
  @IsString()
  @MinLength(1)
  @MaxLength(30)
  name: string;

  @IsString()
  @IsOptional()
  @MinLength(5)
  @MaxLength(200)
  description: string;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  price: number;

  @IsNumber()
  @IsInt()
  @IsPositive()
  @IsOptional()
  stock: number;

  @IsString()
  @IsOptional()
  slug?: string;

  @IsOptional()
  @MinLength(5)
  @MaxLength(200)
  image: string;
}
