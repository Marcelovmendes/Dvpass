import { ConflictException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { CardsRepository } from './cards.repository';

@Injectable()
export class CardsService {
  constructor(private readonly cardsRepository: CardsRepository) {}
  create(body: CreateCardDto, userId: number) {
    const checkCard = this.cardsRepository.findOneByTitle(body.title, userId);
    if(checkCard) throw new ConflictException('Card title already exists');

    return this.cardsRepository.create(body, userId);
  }

  findAll(userId : number) {
     const cards = this.cardsRepository.findAll(userId);
     if(!cards) throw new NotFoundException('No cards found');
    return cards
  }

  findOne(id: number , userId: number) {
   const card = this.cardsRepository.findOne(id, userId);
   if(!card) throw new ForbiddenException('No cards found');
   return card
  }

  update(id: number, updateCardDto: UpdateCardDto) {
    return `This action updates a #${id} card`;
  }

  remove(id: number) {
    return `This action removes a #${id} card`;
  }
}
