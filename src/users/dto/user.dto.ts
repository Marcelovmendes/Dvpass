import { IsEmail, IsNotEmpty, IsStrongPassword } from 'class-validator';

export class UserDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;
  
  @IsStrongPassword()
  @IsNotEmpty()
  password: string;
}
