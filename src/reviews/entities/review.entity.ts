import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Review {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'text',
    length: 15,
  })
  authorName: string;

  @Column({
    type: 'text',
    length: 150,
  })
  @Column('text')
  comment: string;

  @Column('date')
  publicationDate: Date;

  @Column('int')
  rating: number;
}
