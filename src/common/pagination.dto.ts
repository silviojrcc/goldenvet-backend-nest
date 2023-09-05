import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, IsPositive, Max, Min } from 'class-validator';

export class PaginationDto {
  @ApiProperty({
    description: 'Maximum number of items to display per page',
    minimum: 0,
    maximum: 100,
    default: 10, // You can define a default value if desired
    required: false, // Indicates that it's not necessary to provide this field in the request
  })
  @IsOptional()
  @IsPositive()
  @Min(0)
  @Max(100)
  @Type(() => Number)
  limit?: number;

  @ApiProperty({
    description: 'Number of items to skip before starting to list',
    minimum: 0,
    default: 0, // You can define a default value if desired
    required: false, // Indicates that it's not necessary to provide this field in the request
  })
  @IsOptional()
  @IsPositive()
  @Min(0)
  @Type(() => Number)
  offset?: number;
}
