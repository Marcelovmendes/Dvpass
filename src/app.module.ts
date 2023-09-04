import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { CredentialsModule } from './credentials/credentials.module';

import { CardsModule } from './cards/cards.module';
import { NotesModule } from './notes/notes.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { EraseRepository } from './erase/erase.repository';
import { EraseModule } from './erase/erase.module';


@Module({
  imports: [PrismaModule, CredentialsModule, AuthModule, CardsModule, NotesModule, UsersModule, EraseModule],
  controllers: [AppController],
  providers: [AppService, EraseRepository],
})
export class AppModule {}
