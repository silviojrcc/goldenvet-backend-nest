import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('product')
export class Product {
  @ApiProperty({
    example: '0fe45f70-1e64-45a6-81a2-95d04f9e6e08',
    description: 'Product ID',
    uniqueItems: true,
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: 'Product 1',
    description: 'Bolsa de alimento para perros sabrositos',
    uniqueItems: true,
  })
  @Column()
  name: string;

  @ApiProperty({
    example:
      'Este alimento es el mejor que podrías darle a tus amigos peludos, nada como un buen alimentazo',
    description: 'Product description',
  })
  @Column()
  description: string;

  @ApiProperty({
    example: '5444.50',
    description: 'Product price',
  })
  @Column('float', {
    default: 0,
  })
  price: number;

  @ApiProperty({
    example: '50',
    description: 'Product stock',
  })
  @Column()
  stock: number;

  @ApiProperty({
    example: 'alimento_sabrositos_20kg',
    description: 'Product Slug - For SEO',
  })
  @Column()
  slug: string;

  @ApiProperty()
  @Column()
  image: string;
}
