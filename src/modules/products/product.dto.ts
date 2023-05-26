import { IsEmail, IsNotEmpty, isNumber, IsNumber, IsString } from "class-validator";
export class productDto {

    @IsString()
    ProductName: string;
    description: string;
    image: string;

    @IsNumber()
    price: number;
    quantity: number;
    categoryId: number;
}