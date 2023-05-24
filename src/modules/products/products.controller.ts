import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, ValidationPipe } from '@nestjs/common';
import { productDto } from './product.dto';
import { ProductsService } from './products.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
@ApiTags('Product Module')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }
  @ApiOperation({ summary: "insert product data with category" })
  @Post('/addProduct')
  addProduct(@Body(new ValidationPipe()) product: productDto) {
    return this.productsService.addProduct(product);
  }
  @ApiOperation({ summary: "update product data " })
  @Put('/updateProduct/:id')
  updateProduct(@Body(new ValidationPipe()) product: productDto, @Param('id', ParseIntPipe) id: number) {
    return this.productsService.updateProduct(product, id, 4);
  }
  @ApiOperation({ summary: "delete product data " })
  @Delete('/deleteProduct/:id')
  deleteProduct(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.deleteProduct(id);
  }

  @Get('allProducts')
  findAllProducts() {
    return this.productsService.findAllProducts();
  }
}

