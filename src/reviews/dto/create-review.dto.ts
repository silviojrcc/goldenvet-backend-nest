import {
  IsInt,
  IsPositive,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class CreateReviewDto {
  @IsString()
  @MinLength(1)
  @MaxLength(25)
  name: string;

  @IsString()
  @MinLength(5)
  @MaxLength(150)
  comment: string;

  @IsInt()
  @Min(1)
  @Max(5)
  @IsPositive()
  rating: number;
}
