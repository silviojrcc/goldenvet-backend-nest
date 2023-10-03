import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty({
    example: 'John Doe',
    description: 'Author name (1-25 characters)',
    minLength: 1,
    maxLength: 25,
  })
  @IsString()
  @MinLength(1)
  @MaxLength(25)
  authorName: string;

  @ApiProperty({
    example: 'This is a comment.',
    description: 'Review comment (5-150 characters)',
    minLength: 5,
    maxLength: 150,
  })
  @IsString()
  @MinLength(5)
  @MaxLength(150)
  comment: string;

  @ApiProperty({
    example: 4,
    description: 'Rating (1-5)',
    minimum: 1,
    maximum: 5,
  })
  @IsInt()
  @Min(1)
  @Max(5)
  @IsPositive()
  rating: number;
}
