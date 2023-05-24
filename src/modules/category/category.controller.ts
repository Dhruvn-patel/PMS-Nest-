import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, ValidationPipe } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { categoryDto } from './category.dto';
import { CategoryService } from './category.service';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService,
  ) { }

  @Post('addCategory')
  async addCategory(@Body(new ValidationPipe()) categoryRes: categoryDto) {
    return this.categoryService.addCategory(categoryRes)
  }

  @Put('updateCategory/:id')
  async updatecategory(@Body(new ValidationPipe()) updateRes: categoryDto, @Param('id', ParseIntPipe) id: number) {
    return this.categoryService.updateData(updateRes, id);
  }

  @Delete('deleteCategory/:id')
  async deleteCategory(@Param('id', ParseIntPipe) id: number) {
    this.categoryService.deleteData(id);
  }
}
