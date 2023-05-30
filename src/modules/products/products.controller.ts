/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, HttpStatus, Param, ParseFilePipeBuilder, ParseIntPipe, Post, Put, Render, Req, Request, Response, UploadedFile, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { productDto } from './product.dto';
import { ProductsService } from './products.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CategoryService } from '../category/category.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from "path"
import { destination, editFileName, imageFileFilter } from './filesconfig.multer';
// import { multipart } from '@nestjs/common/pipes/multipart';
@ApiTags('Product Module')
@Controller('products')



export class ProductsController {

  constructor(private readonly productsService: ProductsService,
    private readonly categoryService: CategoryService) { }

  @Get()
  @Render('products')
  getProducts() {
    return;
  }

  @ApiOperation({ summary: "insert product data with category" })
  @Post('/addProduct')
  addProduct(@Body(new ValidationPipe()) product: productDto) {
    return this.productsService.addProduct(product, product.categoryId);
  }
  // please write proper code to get dat
  @Post('/newAddProduct')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: destination,
      filename: editFileName
    }),
    fileFilter: imageFileFilter
  }))
  async addProductwithFile(
    @UploadedFile() file: Express.Multer.File,
    @Body('ProductName') name: string,
    @Body('description') description: string,
    @Body('price') price: number,
    @Body('quantity') quantity: number,
    @Body('catagory') categoryIds: string,
  ) {
    // console.log(file, name, description, price, categoryIds);
    return this.productsService.uploadSingleFile(file, name, description, price, quantity, categoryIds);
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

  @Get()
  async findallProduct() {
    const data = await this.productsService.findAllProductsWithCategoryAndSort('name', 'ASC');
    console.log(data);

  }
}



