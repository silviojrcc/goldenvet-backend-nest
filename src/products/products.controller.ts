import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Product } from './entities/product.entity';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @ApiResponse({
    status: 201,
    description: 'The product has been successfully created',
    type: Product,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request: The request data is invalid',
  })
  @ApiResponse({
    status: 401,
    description:
      'Unauthorized: Authentication is required to perform this action',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden: You do not have permission to perform this action',
  })
  @ApiResponse({
    status: 500,
    description:
      'Internal Server Error: An unexpected error occurred on the server',
  })
  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved the list of all products',
    type: [Product],
  })
  @ApiResponse({
    status: 204,
    description: 'No content: There are no products available',
  })
  @ApiResponse({
    status: 500,
    description:
      'Internal Server Error: An unexpected error occurred on the server',
  })
  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved the list of products',
    type: Product,
  })
  @ApiResponse({
    status: 500,
    description:
      'Internal Server Error: An unexpected error occurred on the server',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }

  @ApiResponse({
    status: 200,
    description: 'Successfully updated the product',
    type: Product,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request: The request data is invalid',
  })
  @ApiResponse({
    status: 401,
    description:
      'Unauthorized: Authentication is required to perform this action',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden: You do not have permission to perform this action',
  })
  @ApiResponse({
    status: 404,
    description: 'Not Found: The product with the specified ID was not found',
  })
  @ApiResponse({
    status: 500,
    description:
      'Internal Server Error: An unexpected error occurred on the server',
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(+id, updateProductDto);
  }

  @ApiResponse({
    status: 200,
    description: 'Successfully deleted the product',
    type: Product,
  })
  @ApiResponse({
    status: 401,
    description:
      'Unauthorized: Authentication is required to perform this action',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden: You do not have permission to perform this action',
  })
  @ApiResponse({
    status: 404,
    description: 'Not Found: The product with the specified ID was not found',
  })
  @ApiResponse({
    status: 500,
    description:
      'Internal Server Error: An unexpected error occurred on the server',
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
