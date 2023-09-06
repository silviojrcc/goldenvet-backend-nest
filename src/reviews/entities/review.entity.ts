import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Review {
  @ApiProperty({
    example: '0fe45f70-1e64-45a6-81a2-95d04f9e6e08',
    description: 'Review ID',
    uniqueItems: true,
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: 'John Doe',
    description: 'Review author',
    minimum: 1,
    maximum: 25,
  })
  @Column({
    type: 'text',
    length: 25,
  })
  authorName: string;

  @ApiProperty({
    example: 'This is a comment ',
    description: 'The comment for the review.',
    minimum: 5,
    maximum: 150,
  })
  @Column({
    type: 'text',
    length: 150,
  })
  @Column('text')
  comment: string;

  @ApiProperty({
    example: '2023-09-06',
    description: 'The publication date of the review.',
  })
  @Column('date')
  publicationDate: Date;

  @ApiProperty({
    example: 4,
    description: 'The rating for the review. Should be between 1 and 5.',
    minimum: 1,
    maximum: 5,
  })
  @Column('int')
  rating: number;
}
