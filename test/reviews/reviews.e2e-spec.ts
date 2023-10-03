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

  afterAll(async () => {
    await app.close();
  });
});
