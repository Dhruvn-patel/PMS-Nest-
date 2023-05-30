/* eslint-disable @typescript-eslint/adjacent-overload-signatures */
/* eslint-disable prettier/prettier */
import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { productDto } from './product.dto';
const prisma = new PrismaClient()
@Injectable()
export class ProductsService {
    constructor(private prismService: PrismaService) { }
    async addProduct(product: productDto, categoryId: number) {
        const { ProductName, description, price, image, quantity } = product;
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


                                },

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
                price: true,
                quantity: true,
                ProductCategory: {
                    select: { categoriesId: true }
                }
            },
        })
        console.log(data);

        return data;
    }

    async uploadSingleFile(file: Express.Multer.File, ProductName: string, description: string, price: number, quantity: number, categoryIds: string) {
        const categoryIdArray: number[] = categoryIds.split(',')
            .map((id) => Number(id.trim()))
            .filter((categoryId) => !isNaN(categoryId));
        console.log(categoryIdArray);

        const categories = categoryIdArray.map((categoryId) => ({ id: Number(categoryId) }));
        // const categories = categoryIdArray.map((category) => ({
        //     Categories: { connect: { id: category } },
        // }));
        console.log(categories, "categories");


        try {
            const data = await this.prismService.product.create({
                data: {
                    ProductName: ProductName,
                    description,
                    price: Number(price),
                    quantity: Number(quantity),
                    image: file.filename,
                    ProductCategory: {
                        create: categories.map((category) => ({
                            Categories: {
                                connect: category,
                            },
                        })),
                    },

                },
                include: { ProductCategory: true },
            });
            return data;
        } catch (error) {
            console.log(error.message);

        }
    }


    async getAllProductsWithCategory(): Promise<any> {
        try {
            const productsData = await this.prismService.product.findMany({
                include: {
                    ProductCategory: {
                        include: {
                            Categories: true,
                        },
                    },
                },
            });

            const productsWithCategory = productsData.map((product) => {
                const categoryNames = product.ProductCategory.map(
                    (productCategory) => productCategory.Categories.name
                );

                return {
                    id: product.id,
                    ProductName: product.ProductName,
                    description: product.description,
                    image: product.image,
                    price: product.price,
                    quantity: product.quantity,
                    categoryNames: categoryNames,
                };
            });

            return productsWithCategory;
        } catch (error) {
            throw new Error('Failed to fetch product data');
        }
    }

    /* pagination */
    // async findAllProducts(page: number, pageSize: number) {
    //     const skip = (page - 1) * pageSize; // Calculate the number of items to skip
    //     const take = pageSize; // Set the number of items to take per page

    //     const data = await this.prismService.product.findMany({
    //         select: {
    //             id: true,
    //             ProductName: true,
    //             description: true,
    //             image: true,
    //             price: true,
    //             quantity: true,
    //             ProductCategory: {
    //                 select: { categoriesId: true },
    //             },
    //         },
    //         skip, // Skip the specified number of items
    //         take, // Take the specified number of items
    //     });

    //     return data;
    // }


    async findAllProductsWithCategoryAndSort(sortBy: string, sortOrder: 'ASC' | 'DESC') {
        const validColumns = ['id', 'ProductName', 'description', 'image', 'price', 'quantity'];

        if (!validColumns.includes(sortBy)) {
            throw new Error(`Invalid column for sorting. Valid columns: ${validColumns.join(', ')}`);
        }

        try {
            const productsData = await this.prismService.product.findMany({
                include: {
                    ProductCategory: {
                        include: {
                            Categories: true,
                        },
                    },
                },
                orderBy: {
                    [sortBy]: sortOrder,
                },
            });

            const productsWithCategory = productsData.map((product) => {
                const categoryNames = product.ProductCategory.map(
                    (productCategory) => productCategory.Categories.name
                );

                return {
                    id: product.id,
                    ProductName: product.ProductName,
                    description: product.description,
                    image: product.image,
                    price: product.price,
                    quantity: product.quantity,
                    categoryNames: categoryNames,
                };
            });

            return productsWithCategory;
        } catch (error) {
            throw new Error('Failed to fetch product data');
        }
    }

}
