import { Injectable, UnauthorizedException } from '@nestjs/common';
import { EraseRepository } from './erase.repository';
import { UsersRepository } from '../users/users.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class EraseService {
  constructor(
    private readonly eraseRepository: EraseRepository,
    private readonly usersRepository: UsersRepository,
  ) {}

  async remove(userId: number, password: string) {
    const user = await this.usersRepository.findOneById(userId);
    const checkPassword = bcrypt.compareSync(password, user.password);
    if (!checkPassword) throw new UnauthorizedException('Wrong password');
    return this.eraseRepository.remove(userId);
  }
}
