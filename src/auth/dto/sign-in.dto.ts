import { IsEmail, IsNotEmpty } from "class-validator";

export class SignInDto {
    @IsNotEmpty()
    name: string;
    @IsEmail()
    email: string;
    @IsNotEmpty()
    password: string;
}
