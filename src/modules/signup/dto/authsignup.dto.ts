import { IsEmail, IsNotEmpty } from "class-validator";
export class AuthSignUpDto {
    // dto fields
    @IsEmail()
    @IsNotEmpty()
    email: string;
    name: string;

    @IsNotEmpty()
    password: string;

}
