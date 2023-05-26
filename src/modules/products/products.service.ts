/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { productDto } from './product.dto';
const prisma = new PrismaClient()
@Injectable()
export class ProductsService {
    constructor(private prismService: PrismaService) { }




    async addProduct(product: productDto) {
        const { ProductName, description, price, image,quantity } = product;
        try {
            const productdata = await this.prismService.product.create({
                data: {
                    ProductName: ProductName,
                    description: description,
                    price: price,
                    image: image,
                    quantity: 1,
                    ProductCategory: {
                        create: {
                            Categories: {
                                connect: {
                                    id: 7
                                }
                            }
                        }
                    }
                },
                include: { ProductCategory: true },
            })
            return productdata;
        } catch (error) {
            return error;
        }

    }
    async updateProduct(product: productDto, id: number, catgoryId: number): Promise<any> {
        const { ProductName, description, price, image } = product;
        const updateProduct = await prisma.product.update({
            where: { id: id },
            data: {
                ProductName: ProductName,
                description: description,
                price: price,
                image: image,
                // ProductCategory: {
                //     update: {
                //         data: {
                //         },
                //         where: {
                //             productId: id
                //         }

                //     }
                // }
            }
        })

        // if (updateProduct) {
        //     await this.prismService.productCategory.update({
        //         where: {
        //             // // categoriesId: catgoryId,
        //             productId: id
        //         },
        //         data: {
        //              categoriesId:catgoryId
        //         }
        //     })
        // }
    }

    async deleteProduct(id: number): Promise<any> {

        try {

            const isExitData = await this.prismService.productCategory.findFirst({ where: { productId: id } })
            if (isExitData) {
                const deleteDataOnJunction = await this.prismService.productCategory.deleteMany({
                    where: {
                        productId: id
                    }
                })
            }
            const deleteData = await this.prismService.product.delete({
                where: {
                    id
                },
            })
        } catch (error) {
            console.log(error);
            return error;
        }
    }


    async findAllProducts() {
        const data = await this.prismService.product.findMany({
            select: {
                id: true,
                ProductName: true,
                description: true,
                image: true,
                ProductCategory: {
                    select: { categoriesId: true }
                }
            },
        })
        console.log(data);

        return data;
    }
}
