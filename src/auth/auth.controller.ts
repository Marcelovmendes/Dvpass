import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  SignUp(@Body() body: CreateUserDto) {
    return this.authService.signUp(body);
  }

  @Post('signin')
  SignIn(@Body() body: CreateUserDto) {
    return this.authService.signIn(body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    // return this.authService.remove(+id);
  }
}
