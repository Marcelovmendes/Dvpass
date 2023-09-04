import { IsNotEmpty, IsString } from "class-validator";

export class removeUserDTO  {
    @IsString()
    @IsNotEmpty()
    password: string;
}