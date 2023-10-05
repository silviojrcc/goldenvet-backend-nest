import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsService } from './application/service/products.service';
import { ProductsController } from './interface/products.controller';
import { Product } from './domain/product.entity';
import { AuthModule } from 'src/auth/auth.module';
import { ProductRepository } from './infrastructure/database/product.repository';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService, ProductRepository],
  imports: [TypeOrmModule.forFeature([Product]), AuthModule],
})
export class ProductsModule {}
