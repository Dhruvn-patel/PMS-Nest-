/* eslint-disable prettier/prettier */
import { Controller, Get, Render, Req, Res } from '@nestjs/common';
import { HomeService } from './home.service';
import { ProductsService } from '../products/products.service';

@Controller('home')
export class HomeController {
  constructor(private readonly homeService: HomeService,
    private readonly productsService: ProductsService) { }

  @Get()
  async listAllProduct(@Req() req, @Res() res) {
    // const productdata = await this.productsService.findAllProducts();
    const productdata = await this.productsService.getAllProductsWithCategory();
    // console.log(data)
    console.log(productdata);
    /* 
     {
     id: 8,
     ProductName: 'product 1',
     description: 'prouduct dec',
     image: 'img1.png',
     price: 822,
     quantity: 12,
     categoryNames: [ 'Mobile', 'Grocery', 'Cloths' ]
   }

    */
    res.render('home', { productdata })
  }
}
