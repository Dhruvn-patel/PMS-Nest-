import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { categoryDto } from './category.dto';
const prisma = new PrismaClient()
@Injectable()
export class CategoryService {
    constructor(private prismService: PrismaService) { }

    async addCategory(categoryRes: categoryDto): Promise<any> {
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



    async updateData(updateRes: categoryDto, id: number): Promise<any> {
        const { name } = updateRes;
        try {
            console.log(name, id);
            const updateData = await prisma.categories.update({
                where: {
                    id: id
                },
                data: {
                    name
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
                    id
                },
            })
        } catch (error) {
            console.log(error);
            return error;
        }
    }
}
