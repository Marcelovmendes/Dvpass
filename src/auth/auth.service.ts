import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { Users } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './dto/create-user.dto';
@Injectable()
export class AuthService {

  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(body: CreateUserDto) {
     
    return await this.usersService.create(body);
  }
  async  signIn(body:  CreateUserDto) {
    const user = await this.usersService.getUserByEmail(body.email);
    if (!user) throw new UnauthorizedException('Wrong email');

    const checkPassword = bcrypt.compareSync(body.password, user.password);
    if (!checkPassword) throw new UnauthorizedException('Wrong password');

    return this.createToken(user);
  }
   createToken(user: Users) {
    const { id, email } = user;
    const payload = {
      id,
      email,
    };
    const token = this.jwtService.sign(payload);

    return { token };
  }
  checkToken(token?: string) {
    try {
      const data = this.jwtService.verify(token);

      return data;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
