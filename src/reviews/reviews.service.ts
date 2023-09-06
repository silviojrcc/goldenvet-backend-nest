import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { PaginationDto } from 'src/common/pagination.dto';
import { Review } from './entities/review.entity';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>,
  ) {}

  private logger = new Logger('ReviewsService');

  async create(createReviewDto: CreateReviewDto) {
    try {
      const review = this.reviewRepository.create(createReviewDto);
      return await this.reviewRepository.save(review);
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;
    const reviews = this.reviewRepository.find({
      take: limit,
      skip: offset,
    });
    return reviews;
  }

  findOne(id: string) {
    try {
      const review = this.reviewRepository.findOneBy({ id });

      if (!review)
        throw new NotFoundException(`Review with id ${id} not found`);

      return review;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async update(id: string, updateReviewDto: UpdateReviewDto) {
    try {
      const review = await this.findOne(id);
      if (!review)
        throw new NotFoundException(`Review with id ${id} not found`);

      return await this.reviewRepository.update(id, updateReviewDto);
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async remove(id: string) {
    try {
      const review = await this.findOne(id);
      if (!review)
        throw new NotFoundException(`Review with id ${id} not found`);

      return await this.reviewRepository.remove(review);
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  private handleDBExceptions(error: any) {
    this.logger.error(error);
    throw new InternalServerErrorException(
      'Unexpected error, check server logs',
    );
  }
}
