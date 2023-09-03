import { IsNotEmpty, IsString, IsStrongPassword, IsUrl } from "class-validator";

export class CreateCredentialDto {
     
     @IsUrl()
     @IsNotEmpty()
     url: string;

     @IsString()
     @IsNotEmpty()
     username: string;
     
     @IsStrongPassword()
     @IsNotEmpty()
     password: string;

     @IsString()
     @IsNotEmpty()
     title: string;

}
