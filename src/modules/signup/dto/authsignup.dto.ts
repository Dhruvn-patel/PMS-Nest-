/* eslint-disable prettier/prettier */
import { IsEmail, IsNotEmpty, IsOptional, IsString, isString } from "class-validator";
export class AuthSignUpDto {
    // dto fields
    @IsEmail()
    @IsNotEmpty()
    email: string;
    name: string;
    
    
    @IsNotEmpty()
    password: string;
    
    // @IsOptional()
    googleId:string;

}
