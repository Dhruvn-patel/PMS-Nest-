/* eslint-disable prettier/prettier */
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
  // async getAllCategoryId(categoryId: number): Promise<any> {
  //   const data = await this.prismService.categories.findUnique({
  //     where: { id: Number(categoryId) },
  //     select: {
  //       id: true,
  //       name: true,
  //     }
  //   })
  //   return data;
  // }
  async getAllCategory() {
    const data = await this.prismService.categories.findMany({
      select: {
        id: true,
        name: true,
      }
    });
    return data;

    /* 
    // Get the total number of pages
    const totalPages = Math.ceil(data.length / this.pageSize);

    // Set the current page to 1 by default
    let currentPage = 1;

    // If the page number is specified in the query string, set the current page to that value
    if (this.pageNumber) {
      currentPage = parseInt(this.pageNumber, 10);
    }

    // Get the data for the current page
    const currentData = data.slice((currentPage - 1) * this.pageSize, currentPage * this.pageSize);

    // Return the current page data and the total number of pages
    return {
      data: currentData,
      totalPages: totalPages,
    };  
    */
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

  async findAllCategoriesPaginated(page: number, pageSize: number): Promise<any> {
    const skip = (page - 1) * pageSize; // Calculate the number of items to skip
    const take = pageSize; // Set the number of items to take per page

    const categories = await this.prismService.categories.findMany({
      skip, // Skip the specified number of items
      take, // Take the specified number of items
    });

    return categories;
  }

  async findAllSortedCategories(sortBy: string, sortOrder: 'ASC' | 'DESC'): Promise<any> {
    const validColumns = ['id', 'name'];

    if (!validColumns.includes(sortBy)) {
      throw new Error(`Invalid column for sorting. Valid columns: ${validColumns.join(', ')}`);
    }

    const categories = await this.prismService.categories.findMany({
      orderBy: {
        [sortBy]: sortOrder,
      },
    });

    return categories;
  }
  async searchCategories(query: string): Promise<any> {
    const categories = await this.prismService.categories.findMany({
      where: {
        name: {
          contains: `%${query}%`,
          // mode: "insensitive"
        },
      } as Prisma.CategoriesWhereInput,
      select: {
        id: true,
        name: true
      }
    });
    return categories;
  }


}