import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, ParseIntPipe, Put, Render, Req, Res, Query } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) { }

  // @Post()
  // create(@Body() createCategoryDto: CreateCategoryDto) {
  //   return this.categoryService.create(createCategoryDto);
  // }

  // @Get()
  // findAll() {
  //   return this.categoryService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.categoryService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
  //   return this.categoryService.update(+id, updateCategoryDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.categoryService.remove(+id);
  // }


  @Get()
  @Render('category')
  cartegoryData() { }

  @Get('AllCategories')
  async findAllCategory(@Req() req, @Res() res) {
    const data = await this.categoryService.getAllCategory();
    return res.status(200).json({
      data: data,
      errmsg: "",
      status: 200
    });
  }
  // @Get(':id')
  // findCategoryById(@Param('id', new ValidationPipe()) categoryId: number) {
  //   return this.categoryService.getAllCategoryId(categoryId);
  // }
  @Post('addCategory')
  async addCategory(@Body(new ValidationPipe()) categoryRes: CreateCategoryDto, @Req() req, @Res() res) {
    const data = await this.categoryService.addCategory(categoryRes)
    return res.status(200).json({
      data: data,
      errmsg: "",
      status: 200
    });
  }

  @Patch('updateCategory/:id')
  async updatecategory(@Body(new ValidationPipe()) updateRes: CreateCategoryDto, @Param('id', ParseIntPipe) id: number, @Req() req, @Res() res) {
    const data = await this.categoryService.updateData(updateRes, id);
    return res.status(200).json({
      data: data,
      errmsg: "",
      status: 200
    });
  }

  @Delete('deleteCategory/:id')
  async deleteCategory(@Param('id', ParseIntPipe) id: number, @Req() req, @Res() res) {
    const data = await this.categoryService.deleteData(id);
    return res.status(200).json({
      data: data,
      errmsg: "",
      status: 200
    });
  }


  @Get('/search')
  async search(@Query() params: any, @Req() req, @Res() res) {
    console.log(params.value);

    const data = await this.categoryService.searchCategories(params.value);
    console.log(data);
    return res.status(200).json({
      data: data,
      errmsg: "",
      status: 200
    });
  }
}
