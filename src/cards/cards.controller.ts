import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CardsService } from './cards.service';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { AuthGuard } from '../auth/auth.guard';
import { User } from '../decorators/user.decorator';
@UseGuards(AuthGuard)
@Controller('cards')
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @Post()
  create(@Body() body: CreateCardDto, @User() user) {
    const userId = user.id
    return this.cardsService.create(body, userId );
  }

  @Get()
  findAll(@User() user) {
    const userId = user.id
    return this.cardsService.findAll( userId );
  }

  @Get(':id')
  findOne(@Param('id') id: string , @User() user) {
    const userId = user.id
    return this.cardsService.findOne(+id, userId );
  }
}
