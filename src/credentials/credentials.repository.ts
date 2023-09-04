import { Injectable } from '@nestjs/common';
import { CreateCredentialDto } from './dto/create-credential.dto';
import { PrismaService } from '../prisma/prisma.service';


@Injectable()
export class CredentialsRepository {
  private cryptr: any;
  private Cryptr = require('cryptr');

  constructor(private readonly prisma: PrismaService) {
    this.cryptr = new this.Cryptr('secret-key');
  }

  async create(body: CreateCredentialDto, userId: number) {
    const { password } = body;

    return await this.prisma.credentials.create({
      data: {
        ...body,
        password: this.cryptr.encrypt(password),
        userId,
      },
    });
  }

  async findAll(userId: number) {
    const credentials = await this.prisma.credentials.findMany({
      where: {
        userId: userId,
      },
    });
    const decryptedCredentials = credentials?.map((credential) => {
      const decryptedPassword = this.cryptr.decrypt(credential.password);
      return {
        ...credential,
        password: decryptedPassword,
      };
    });
    return decryptedCredentials;
  }

  async findOne(id: number, userId: number) {
    const credential = await this.prisma.credentials.findUnique({
      where: {
        id: id,
        userId: userId,
      },
    });
    const decryptedCredential = this.cryptr.decrypt(credential.password);
    return {
      ...credential,
      password: decryptedCredential,
    }
  }
  async findOneByTitle(title: string, userId: number) {
    return await this.prisma.credentials.findFirst({
      where: {
        title: title,
        userId: userId,
      },
    });
  }
}
