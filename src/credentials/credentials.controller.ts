import { Controller, Get, Post, Body, Param,  UseGuards } from '@nestjs/common';
import { CredentialsService } from './credentials.service';
import { CreateCredentialDto } from './dto/create-credential.dto';

import { AuthGuard } from '../auth/auth.guard';
import { User } from '../decorators/user.decorator';
import { Users } from '@prisma/client';

@Controller('credentials')
export class CredentialsController {
  constructor(private readonly credentialsService: CredentialsService) {}
  
  @Post()
  @UseGuards(AuthGuard)
  create(@Body() body: CreateCredentialDto, @User() user :Users ) {
    console.log(user, 'user')
    const userId = user.id
    return this.credentialsService.create(body , userId);
  }

  @Get()
  findAll(@User() user ) {
    const userId = user.id
    console.log(user,'user')
    return this.credentialsService.findAll(  userId );
  }

  @Get(':id')
  findOne(@Param('id') id: string , @User() user ) {
    const userId = user.id
    return this.credentialsService.findOne(+id , userId );
  }

}
