/* eslint-disable prettier/prettier */
import { IsEmail, IsEmpty, isEmpty, IsNotEmpty, IsOptional, IsString, isString, Matches, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    name: string;

}
