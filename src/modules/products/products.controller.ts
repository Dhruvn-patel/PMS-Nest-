import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Req, Request, Response, UploadedFile, UseInterceptors, ValidationPipe } from '@nestjs/common';
import { productDto } from './product.dto';
import { ProductsService } from './products.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CategoryService } from '../category/category.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from "path"
import { destination, editFileName, imageFileFilter } from './filesconfig.multer';
@ApiTags('Product Module')
@Controller('products')



export class ProductsController {


  constructor(private readonly productsService: ProductsService,
    private readonly categoryService: CategoryService) { }

  @ApiOperation({ summary: "insert product data with category" })
  @Post('/addProduct')
  @UseInterceptors(FileInterceptor("image", {
    storage: diskStorage({
      destination: destination,
      filename: editFileName
    }),
    fileFilter: imageFileFilter
  }))
  addProduct(@UploadedFile() file: Express.Multer.File, @Body(new ValidationPipe()) product: productDto) {
    console.log(file);

    return this.productsService.addProduct(product, file, product.categoryId);
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

  @Post('checkproduct')
  checkProduct(@Body() product) {
    console.log(product.productName);
  }




  @Get()
  async getUsers(@Request() req, @Response() res) {
    const categories = await this.categoryService.getAllCategory()
    return res.render('products', { categories })
  }
}

