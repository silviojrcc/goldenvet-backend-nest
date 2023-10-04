import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as request from 'supertest';

import { ReviewsModule } from '../../src/reviews/reviews.module';
import { CreateReviewDto } from '../../src/reviews/dto/create-review.dto';

describe('[Feature] Reviews - /reviews (e2e)', () => {
  const review: CreateReviewDto = {
    authorName: 'Silvio',
    comment: 'Está muy buena la api',
    rating: 5,
  };

  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          envFilePath: '.testing.env',
        }),
        ReviewsModule,
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: process.env.DB_HOST,
          port: 5433,
          database: process.env.DB_NAME,
          username: process.env.DB_USERNAME,
          password: process.env.DB_PASSWORD,
          autoLoadEntities: true,
          synchronize: true,
        }),
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
    );
    await app.init();
  });

  describe('POST Create Review', () => {
    it('should create a review successfully', async () => {
      const createResponse = await request(app.getHttpServer())
        .post('/reviews')
        .send(review)
        .expect(HttpStatus.CREATED);

      expect(createResponse.body.id).toBeDefined();
      expect(createResponse.body.comment).toBe(review.comment);
    });

    it('should return bad request for invalid input', () => {
      const invalidReview: CreateReviewDto = {
        authorName: 'Silvio',
        comment: 'Está muy buena la api',
        rating: 6,
      };

      return request(app.getHttpServer())
        .post('/reviews')
        .send(invalidReview)
        .expect(HttpStatus.BAD_REQUEST);
    });
  });

  describe('Get all reviews', () => {
    it('should get all reviews successfully', async () => {
      const response = await request(app.getHttpServer())
        .get('/reviews')
        .expect(HttpStatus.OK);

      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  describe('GET One Review by ID', () => {
    it('should retrieve a review by its ID', async () => {
      const createResponse = await request(app.getHttpServer())
        .post('/reviews')
        .send(review)
        .expect(HttpStatus.CREATED);

      const reviewId = createResponse.body.id;

      return request(app.getHttpServer())
        .get(`/reviews/${reviewId}`)
        .expect(HttpStatus.OK);
    });

    it('should return bad request if not valid id is given', async () => {
      const notValidId = 'not-valid-id';

      return await request(app.getHttpServer())
        .get(`/reviews/${notValidId}`)
        .expect(HttpStatus.BAD_REQUEST);
    });

    it('should handle non-existent review ID', async () => {
      const nonExistentId = '7606c263-dc64-43e1-aad4-ee966b996f75';

      return await request(app.getHttpServer())
        .get(`/reviews/${nonExistentId}`)
        .expect(HttpStatus.NOT_FOUND);
    });
  });

  describe('Update Review', () => {
    it('should update a review successfully', async () => {
      const createResponse = await request(app.getHttpServer())
        .post('/reviews')
        .send(review)
        .expect(HttpStatus.CREATED);

      const reviewId = createResponse.body.id;

      const updatedData = {
        comment: 'Esta muy buena la api * Editado',
      };

      const patchResponse = await request(app.getHttpServer())
        .patch(`/reviews/${reviewId}`)
        .send(updatedData)
        .expect(HttpStatus.OK);

      expect(patchResponse.body.id).toBe(reviewId);
      expect(patchResponse.body.comment).toBe(updatedData.comment);
    });
  });

  describe('Delete review', () => {
    it('should delete a review successfully', async () => {
      const createResponse = await request(app.getHttpServer())
        .post('/reviews')
        .send(review)
        .expect(HttpStatus.CREATED);

      const reviewId = createResponse.body.id;

      await request(app.getHttpServer())
        .delete(`/reviews/${reviewId}`)
        .expect(HttpStatus.OK);

      return await request(app.getHttpServer())
        .get(`/reviews/${reviewId}`)
        .expect(HttpStatus.NOT_FOUND);
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
