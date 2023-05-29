/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { HomeService } from './home.service';
import { HomeController } from './home.controller';
import { ProductsService } from '../products/products.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [HomeController],
  providers: [HomeService, ProductsService, PrismaService]
})
export class HomeModule { }
