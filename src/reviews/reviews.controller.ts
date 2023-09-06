import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { PaginationDto } from 'src/common/pagination.dto';
import { ApiExcludeEndpoint, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Review } from './entities/review.entity';

@ApiTags('Reviews')
@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @ApiResponse({
    status: 201,
    description: 'The review has been successfully created',
    type: Review,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request: The request data is invalid',
  })
  @ApiResponse({
    status: 500,
    description:
      'Internal Server Error: An unexpected error occurred on the server',
  })
  @Post()
  create(@Body() createReviewDto: CreateReviewDto) {
    return this.reviewsService.create(createReviewDto);
  }

  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved the list of all reviews',
    type: [Review],
  })
  @ApiResponse({
    status: 204,
    description: 'No content: There are no reviews available',
  })
  @ApiResponse({
    status: 500,
    description:
      'Internal Server Error: An unexpected error occurred on the server',
  })
  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.reviewsService.findAll(paginationDto);
  }

  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved the review',
    type: Review,
  })
  @ApiResponse({
    status: 500,
    description:
      'Internal Server Error: An unexpected error occurred on the server',
  })
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.reviewsService.findOne(id);
  }

  @ApiExcludeEndpoint()
  @ApiResponse({
    status: 200,
    description: 'Successfully updated the review',
    type: Review,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request: The request data is invalid',
  })
  @ApiResponse({
    status: 401,
    description:
      'Unauthorized: Authentication is required to perform this action',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden: You do not have permission to perform this action',
  })
  @ApiResponse({
    status: 404,
    description: 'Not Found: The product with the specified ID was not found',
  })
  @ApiResponse({
    status: 500,
    description:
      'Internal Server Error: An unexpected error occurred on the server',
  })
  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateReviewDto: UpdateReviewDto,
  ) {
    return this.reviewsService.update(id, updateReviewDto);
  }

  @ApiResponse({
    status: 200,
    description: 'Successfully deleted the review',
    type: Review,
  })
  @ApiResponse({
    status: 401,
    description:
      'Unauthorized: Authentication is required to perform this action',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden: You do not have permission to perform this action',
  })
  @ApiResponse({
    status: 404,
    description: 'Not Found: The product with the specified ID was not found',
  })
  @ApiResponse({
    status: 500,
    description:
      'Internal Server Error: An unexpected error occurred on the server',
  })
  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.reviewsService.remove(id);
  }
}
