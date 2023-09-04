import { ConflictException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { NotesRepository } from './notes.repository';

@Injectable()
export class NotesService {
  constructor(private readonly repository: NotesRepository) {}
  create(body: CreateNoteDto, userId: number) {
    const { title } = body;
    const checkNote = this.repository.findOneByTitle(title, userId);
    if (checkNote) throw new ConflictException('Note title already exists');

    return this.repository.create(body, userId);
  }

  findAll( userId: number) {
   const notes = this.repository.findAll( userId);
    if (!notes) throw new NotFoundException('No notes found');
  }

  findOne(id: number, userId: number) {
   const note = this.repository.findOne(id  , userId);
   if(!note) throw new ForbiddenException('No notes found');
  return note   
  }
}