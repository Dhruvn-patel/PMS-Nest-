import { IsEmail, IsNotEmpty, isNumber, IsNumber, IsString } from "class-validator";
export class categoryDto {

    @IsString()
    name: string;
}
