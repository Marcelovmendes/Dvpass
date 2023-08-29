import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { CredentialsModule } from './credentials/credentials.module';
import { UsersModule } from './users/users.module';
import { CardsModule } from './cards/cards.module';
import { NotesModule } from './notes/notes.module';

@Module({
  imports: [PrismaModule, CredentialsModule, UsersModule, CardsModule, NotesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
