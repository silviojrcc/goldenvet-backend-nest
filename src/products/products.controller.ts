import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  Query,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { PaginationDto } from 'src/common/pagination.dto';
import { Auth } from 'src/auth/application/decorators/auth.decorator';
import { ValidRoles } from 'src/auth/application/interfaces/valid-roles.interface';

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
  @Auth(ValidRoles.ADMIN)
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
  findAll(@Query() paginationDto: PaginationDto) {
    return this.productsService.findAll(paginationDto);
  }

  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved the product',
    type: Product,
  })
  @ApiResponse({
    status: 500,
    description:
      'Internal Server Error: An unexpected error occurred on the server',
  })
  @Get(':term')
  findOne(@Param('term') term: string) {
    return this.productsService.findOne(term);
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
  @Auth(ValidRoles.ADMIN)
  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productsService.update(id, updateProductDto);
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
  @Auth(ValidRoles.ADMIN)
  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.productsService.remove(id);
  }
}
