import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersRepository {

    constructor (private readonly prisma: PrismaService) {}
  create(body: CreateUserDto) {
    return this.prisma.users.create({ data: body})
  }

  findOne(email : string) {
   
    return this.prisma.users.findFirst({ where: { email } })
  }

  findAll() {
    return this.prisma.users.findMany()
  }

  remove(id: number) {
    return this.prisma.users.delete({ where: { id } })
  }
}