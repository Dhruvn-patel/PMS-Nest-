import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Render, Req, Request, Response, UploadedFile, UseInterceptors, ValidationPipe } from '@nestjs/common';
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

  @Get()
  @Render('products')
  getProducts() {
    return;
  }

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



/* 


4.12 KiB
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Render,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ProductService } from '../services/product.service';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { addProduct, checkDelete } from '../dtos/checkProductInput.dto';
import { JwtService } from '@nestjs/jwt';
@Controller('product')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private jwtService: JwtService,
  ) {}
  @Get('')
  @Render('products')
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Dashboard products render.',
  })
  @ApiOperation({ summary: 'Dashboard products render.' })
  root() {
    return;
  }
  @Get('getProducts')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Dashboard category render.',
  })
  @ApiOperation({ summary: 'Dashboard category render.' })
  public async getProducts(
    @Req()
    req: Request,
    @Res()
    res: Response,
  ): Promise<any> {
    const token = req.cookies['auth_token'];
    const payload = await this.jwtService.verifyAsync(token, {
      secret: process.env.JWT_SECRET,
    });
    const result: any = await this.productService.getAllProducts(payload);
    return res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      data: result,
      message: `Successfully Edited Product Data`,
    });
  }
  @Post('edit-product/:id')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Edit Product',
  })
  @ApiOperation({ summary: 'Edit Product' })
  public async getProductEdit(
    @Req()
    req: Request,
    @Res()
    res: Response,
  ): Promise<any> {
    const token = req.cookies['auth_token'];
    const payload = await this.jwtService.verifyAsync(token, {
      secret: process.env.JWT_SECRET,
    });
    const result: any = await this.productService.getProductEdit(payload);
    return res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      data: result,
      message: `Successfully Edit Product Data`,
    });
  }
  @Get('edit-product/:id')
  @Render('edit_products')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Edit Product Page',
  })
  @ApiOperation({ summary: 'Edit Product Page' })
  public async getProductEditPage() {
    return;
  }
  @Get('edit-product-data/:id')
  @Render('edit_products')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Edit Product data',
  })
  @ApiOperation({ summary: 'Edit Product data' })
  public async getProductEditData(
    @Req()
    req: Request,
    @Res()
    res: Response,
    @Param() params: number,
  ): Promise<any> {
    const result: any = await this.productService.EditProductGetData(params);
  }
  @Post('addProduct')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.OK, description: 'Success.' })
  @ApiOperation({ summary: 'added category' })
  public async getAddProduct(
    @Req()
    req: Request,
    @Res()
    res: Response,
    @Body() Dto: addProduct,
  ): Promise<any> {
    const result: any = await this.productService.AddProduct(Dto);
    console.log(
      '🚀 ~ file: product.controller.ts:68 ~ ProductController ~ result:',
      result,
    );
    return res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      data: result,
      message: `Product added successfully`,
    });
  }
  @Post('deleteRecord')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @ApiResponse({ status: HttpStatus.OK, description: 'Delete User Data' })
  @ApiOperation({ summary: 'Delete User Data by admin' })
  async getUsersDelete(
    @Req() req: Request,
    @Res() res: Response,
    @Body() Dto: checkDelete,
  ): Promise<any> {
    const result: any = await this.productService.DeleteProductAction(Dto);
    return res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      data: result,
      message: `Product Record deleted successfully`,
    });
  }
}


*/
