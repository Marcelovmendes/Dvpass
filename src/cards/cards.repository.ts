import { Injectable } from '@nestjs/common';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CardsRepository {
  private cryptr: any;
  private Cryptr = require('cryptr');

  constructor(private readonly prisma: PrismaService) {
    this.cryptr = new this.Cryptr(process.env.CRYPTR_KEY);
  }

  async create(body: CreateCardDto, userId: number) {
    const { password } = body;
    const card = await this.prisma.card.create({
      data: {
        ...body,
        password: this.cryptr.encrypt(password),
        userId,
      },
    });
    return card;
  }

  async findAll(userId: number) {
    const cards = await this.prisma.card.findMany({
      where: {
        userId: userId,
      },
    });
    const decryptedCards = cards?.map((card) => {
      const decryptedPassword = this.cryptr.decrypt(card.password);
      return {
        ...card,
        password: decryptedPassword,
      };
    });
    return decryptedCards;
  }

  async findOne(id: number, userId: number) {
    const card = await this.prisma.card.findUnique({
      where: {
        id: id,
        userId: userId,
      },
    });
    const decryptedCard = this.cryptr.decrypt(card.password);
    return {
      ...card,
      password: decryptedCard,
    };
  }
  async findOneByTitle(title: string, userId: number) {
    return await this.prisma.credentials.findFirst({
      where: {
        title: title,
        userId: userId,
      },
    });
  }

  update(id: number, updateCardDto: UpdateCardDto) {
    return `This action updates a #${id} card`;
  }

  remove(id: number) {
    return `This action removes a #${id} card`;
  }
}
