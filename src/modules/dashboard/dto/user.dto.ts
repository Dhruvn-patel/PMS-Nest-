import { IsEmail, IsNotEmpty, isNumber, IsNumber, IsString } from "class-validator";
export class UserDto {

    @IsString()
    name: string;
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    password: string;

    @IsNumber()
    roleId: number;
}
