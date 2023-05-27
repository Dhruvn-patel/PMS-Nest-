import { Injectable } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
const prisma = new PrismaClient()
@Injectable()
export class CategoryService {

  constructor(private prismService: PrismaService) { }
  create(createCategoryDto: CreateCategoryDto) {
    return 'This action adds a new category';
  }

  findAll() {
    return `This action returns all category`;
  }

  findOne(id: number) {
    return `This action returns a #${id} category`;
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }


  async addCategory(categoryRes: CreateCategoryDto): Promise<any> {
    const categoryname = categoryRes.name;

    try {
      const data = await this.prismService.categories.create({
        data: {
          name: categoryname
        }
      })
      return data;
    } catch (error) {
      return error;
    }
  }
  async getAllCategoryId(categoryId: number): Promise<any> {
    const data = await this.prismService.categories.findUnique({
      where: { id: Number(categoryId) },
      select: {
        id: true,
        name: true,
      }
    })
    return data;
  }
  async getAllCategory() {
    const data = await this.prismService.categories.findMany({
      select: {
        id: true,
        name: true,
      }
    });
    return data;
  }
  async updateData(updateRes: CreateCategoryDto, id: number): Promise<any> {
    const { name } = updateRes;
    try {
      console.log(name, id);
      const updateData = await prisma.categories.update({
        where: {
          id: id
        },
        data: {
          name: name
        }
      })
      return updateData;
    } catch (error) {
      return error;
    }
  }
  async deleteData(id: number): Promise<any> {
    try {
      // console.log("deleted ");

      /* delete before in junction table */
      const isExitData = await this.prismService.productCategory.findFirst({ where: { categoriesId: id } })

      if (isExitData) {
        const deleteDataOnJunction = await this.prismService.productCategory.deleteMany({
          where: {
            categoriesId: id
          }
        })
      }
      const deleteData = await this.prismService.categories.delete({
        where: {
          id: id
        },
      })
      return deleteData;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

}