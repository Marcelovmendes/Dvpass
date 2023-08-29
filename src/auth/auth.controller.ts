import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';


@Controller('users')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  SignUp(@Body() body: CreateUserDto) {
    return this.authService.create(body);
  }

  @Post('signin')
  SignIn(@Body() body: CreateUserDto) {
    const { email, password } = body;
     return this.authService.signIn( email, password);
  }

 

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }
}
