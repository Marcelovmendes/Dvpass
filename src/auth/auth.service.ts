import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { Users } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(body: any) {
    return await this.usersService.create(body);
  }
  async signIn(body: any) {
    const user = await this.usersService.getUserByEmail(body.email);
    if (!user) throw new UnauthorizedException('Wrong email');

    const checkPassword = bcrypt.compareSync(body.password, user.password);
    if (!checkPassword) throw new UnauthorizedException('Wrong password');

    return this.createToken(user);
  }
  async createToken(user: Users) {
    const { id, email } = user;
    const payload = {
      id,
      email,
    };
    const token = this.jwtService.sign(payload);

    return { token };
  }
}
