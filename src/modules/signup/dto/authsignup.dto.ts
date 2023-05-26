/* eslint-disable prettier/prettier */
import { IsEmail, IsEmpty, isEmpty, IsNotEmpty, IsOptional, IsString, isString, Matches, MaxLength, MinLength } from "class-validator";
export class AuthSignUpDto {
    // dto fields
    @IsEmail()
    @IsNotEmpty()
    email: string;
    name: string;


    @IsNotEmpty()
    @MinLength(8)
    @MaxLength(20)
    // @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, { message: 'password too weak' })
    password: string;


    @IsEmpty()
    googleId: string;




}