import { Injectable } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class NotesRepository {
     
    constructor(private readonly prisma : PrismaService) {}
  async create(body: CreateNoteDto, userId: number) {
     return await this.prisma.notes.create({
         data: {
           ...body, 
           userId
         }
     })
  }

  findAll(  userId: number) {
    return this.prisma.notes.findMany({
      where: {
        userId: userId,
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
  findOne(id: number, userId: number) {
    return this.prisma.notes.findUnique({
      where: {
        id: id,
        userId: userId
      },
    })
  }

  update(id: number, updateNoteDto: UpdateNoteDto) {
    return `This action updates a #${id} note`;
  }

  remove(id: number) {
    return `This action removes a #${id} note`;
  }
}
