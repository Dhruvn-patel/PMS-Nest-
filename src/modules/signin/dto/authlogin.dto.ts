
import { IsEmail, IsNotEmpty, IsNumber, IsOptional } from "class-validator";
export class AuthLoginDto {

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    password: string;

    // @IsNumber()
    // rolesId: Number;
    @IsOptional()
    googleId: string

}