import {
  Controller,
  Post,
  Body,
  HttpCode,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService ) {}

  @Post('signup')
  SignUp(@Body() body: CreateUserDto ) {
    this.authService.signUp(body);
     HttpCode(201);
    return 'Created';
  }
 
  @Post('signin')
  SignIn(@Body() body: CreateUserDto) {
    return this.authService.signIn(body);
  }
}
