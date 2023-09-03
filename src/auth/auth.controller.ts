import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthGuard } from './auth.guard';
import { User } from '../users/decorators/user.decorator';

@Controller('user')
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
  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @User() user) {
    // return this.authService.remove(+id);
  }
}
