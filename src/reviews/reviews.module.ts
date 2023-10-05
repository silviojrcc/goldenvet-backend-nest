import { Module } from '@nestjs/common';
import { ReviewsService } from './application/service/reviews.service';
import { ReviewsController } from './interface/reviews.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Review } from './domain/review.entity';

@Module({
  controllers: [ReviewsController],
  providers: [ReviewsService],
  imports: [TypeOrmModule.forFeature([Review])],
})
export class ReviewsModule {}
