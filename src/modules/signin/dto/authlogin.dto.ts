import { IsEmail, IsNotEmpty, IsNumber } from "class-validator";
export class AuthLoginDto {

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    password: string;

    // @IsNumber()
    // rolesId: Number;

}
