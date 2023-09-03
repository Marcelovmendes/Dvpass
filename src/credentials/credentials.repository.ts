import { Injectable } from '@nestjs/common';
import { CreateCredentialDto } from './dto/create-credential.dto';
import { UpdateCredentialDto } from './dto/update-credential.dto';
import { PrismaService } from '../prisma/prisma.service';
import Cryptr from 'cryptr';
import { abort } from 'process';

@Injectable()
export class CredentialsRepository {
  private cryptr: any;
  Cryptr = require('cryptr');
  constructor(private readonly prisma: PrismaService) {
    this.cryptr = new Cryptr(process.env.CRYPTR_KEY);
  }

  async create(body: CreateCredentialDto, userId : number) {
    const { password } = body;
    
      return await this.prisma.credentials.create({
            data: {
              ...body, 
              password: this.cryptr.encrypt(password),
              userId
            }
      })


  }

  findAll() {
    return `This action returns all credentials`;
  }

  findOne(id: number) {
    return `This action returns a #${id} credential`;
  }
  findOneByTitle(title: string) {
    return this.prisma.credentials.findFirst({
      where: {
        title: title,
      },
    });
  }

  update(id: number, updateCredentialDto: UpdateCredentialDto) {
    return `This action updates a #${id} credential`;
  }

  remove(id: number) {
    return `This action removes a #${id} credential`;
  }
}
