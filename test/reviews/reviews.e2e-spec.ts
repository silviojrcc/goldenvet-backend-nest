import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { ReviewsModule } from '../../src/reviews/reviews.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateReviewDto } from '../../src/reviews/dto/create-review.dto';

describe('[Feature] Reviews - /reviews (e2e)', () => {
  const review: CreateReviewDto = {
    authorName: 'Silvio',
    comment: 'Está muy buena la api',
    rating: 5,
  };

  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        ReviewsModule,
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: process.env.DB_HOST,
          port: 5433,
          database: 'goldenvetdb-test',
          username: 'postgres',
          password: '12345678',
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

  it('/ (POST)', () => {
    return request(app.getHttpServer())
      .post('/reviews')
      .send(review)
      .expect(HttpStatus.CREATED);
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

  afterAll(async () => {
    await app.close();
  });
});
