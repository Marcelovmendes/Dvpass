import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';


@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService
  ) { }

   canActivate(context: ExecutionContext):boolean   {
    const response = context.switchToHttp().getResponse();
    const { authorization } = response.headers;

    try {
      const data = this.authService.checkToken((authorization ?? "").split(" ")[1]);
      const user =  this.userService.getUserById(parseInt(data.id));
      console.log(user,'user guard')
      response.locals.user = user
       return true
    } catch (error) {
      console.log(error,'auth guard error');
      return false;
    }


  }

}