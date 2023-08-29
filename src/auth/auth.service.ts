import {
  HttpException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersRepository } from './auth.repository';
import bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly jwtService: JwtService,
  ) {}
  create(body: CreateUserDto) {
    const { email, password } = body;
    return this.usersRepository.create({ email, password });
  }
  async signIn(email, password) {
    const user = await this.usersRepository.findOne(email);
    if (!user) throw new NotFoundException('User not found');

    if (user && bcrypt.compareSync(password, user.password)) {
      const payload = { sub: user.id, email: user.email };

      //falta adicionar na entidade sessions
      return { access_token: this.jwtService.signAsync(payload) };
    } else {
      throw new UnauthorizedException();
    }
  }

  findAll() {
    return this.usersRepository.findAll();
  }

  remove(id: number) {
    return this.usersRepository.remove(id);
  }
}
