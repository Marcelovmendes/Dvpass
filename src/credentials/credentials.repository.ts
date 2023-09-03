import { Injectable } from '@nestjs/common';
import { CreateCredentialDto } from './dto/create-credential.dto';
import { UpdateCredentialDto } from './dto/update-credential.dto';
import { PrismaService } from '../prisma/prisma.service';
import Cryptr from 'cryptr';

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

  async findAll( userId : number) {
    const credentials =  await this.prisma.credentials.findMany({
      where: {
        userId: userId,
      },
    })
    const decryptedCredentials = credentials?.map((credential) => {
     const decryptedPassword = this.cryptr.decrypt(credential.password);
     return  {
       ...credential,
       password: decryptedPassword
     }
    })
    return decryptedCredentials;
  }

  findOne(id: number, userId: number) {
    return  this.prisma.credentials.findUnique({
      where: {
        id: id,
        userId: userId
      },
      
    })
  }
  findOneByTitle(title: string, userId: number) {
    return this.prisma.credentials.findFirst({
      where: {
        title: title,
        userId: userId
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
