import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { AuthGuard } from '../auth/auth.guard';
import { User } from '../decorators/user.decorator';

@UseGuards(AuthGuard)
@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Post()
  create(@Body() body: CreateNoteDto, @User() user) {
    const userId = user.id;
    return this.notesService.create(body, userId);
  }

  @Get()
  findAll(@User() user) {
    const userId = user.id;
    return this.notesService.findAll(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @User() user) {
    const userId = user.id
    return this.notesService.findOne(+id , userId );
  }

}
