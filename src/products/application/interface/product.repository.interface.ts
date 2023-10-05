import { Product } from '@/products/domain/product.entity';
import { CreateProductDto } from '../dto/create-product.dto';
import { PaginationDto } from '@/common/pagination.dto';
import { UpdateProductDto } from '../dto/update-product.dto';

export interface IProductRepository {
  create(createProductDto: CreateProductDto): Promise<Product>;
  findAll(paginationDto: PaginationDto): Promise<Product[]>;
  findOne(id: string): Promise<Product>;
  findOneByTerm(term: string): Promise<Product>;
  update(id: string, updateProductDto: UpdateProductDto): Promise<Product>;
  remove(id: string): Promise<Product>;
}
