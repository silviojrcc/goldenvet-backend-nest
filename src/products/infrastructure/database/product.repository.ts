import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { isUUID } from 'class-validator';

import { Product } from '@/products/domain/product.entity';
import { PaginationDto } from '@/common/pagination.dto';
import { IProductRepository } from '@/products/application/interface/product.repository.interface';
import { UpdateProductDto } from '@/products/application/dto/update-product.dto';
import { CreateProductDto } from '@/products/application/dto/create-product.dto';

@Injectable()
export class ProductRepository implements IProductRepository {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    const product = this.productRepository.create(createProductDto);
    return await this.productRepository.save(product);
  }

  async findAll(paginationDto: PaginationDto) {
    return await this.productRepository.find({
      take: paginationDto.limit,
      skip: paginationDto.offset,
    });
  }

  async findOne(id: string) {
    const product = await this.productRepository.findOneBy({ id });

    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }

    return product;
  }

  async findOneByTerm(term: string) {
    const product: Product | undefined = isUUID(term)
      ? await this.productRepository.findOneBy({ id: term })
      : await this.productRepository
          .createQueryBuilder('prod')
          .where('slug = :slug', { slug: term })
          .getOne();

    if (!product) {
      throw new NotFoundException(`Product with term ${term} not found`);
    }

    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const product = await this.findOne(id);
    return await this.productRepository.save({
      ...product,
      ...updateProductDto,
    });
  }

  async remove(id: string) {
    const product = await this.findOne(id);
    return await this.productRepository.remove(product);
  }
}
