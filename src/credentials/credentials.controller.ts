import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CredentialsService } from './credentials.service';
import { CreateCredentialDto } from './dto/create-credential.dto';
import { UpdateCredentialDto } from './dto/update-credential.dto';
import { AuthGuard } from '../auth/auth.guard';
import { User } from '../decorators/user.decorator';

@UseGuards(AuthGuard)
@Controller('credentials')
export class CredentialsController {
  constructor(private readonly credentialsService: CredentialsService) {}

  @Post()
  create(@Body() body: CreateCredentialDto, @User() user ) {
    console.log(user)
    const userId = user.id
    return this.credentialsService.create(body , userId);
  }

  @Get()
  findAll(@User() user ) {
    const userId = user.id
    return this.credentialsService.findAll(  userId );
  }

  @Get(':id')
  findOne(@Param('id') id: string , @User() user ) {
    const userId = user.id
    return this.credentialsService.findOne(+id , userId );
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCredentialDto: UpdateCredentialDto) {
    return this.credentialsService.update(+id, updateCredentialDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.credentialsService.remove(+id);
  }
}
