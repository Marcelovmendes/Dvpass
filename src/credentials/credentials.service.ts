import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCredentialDto } from './dto/create-credential.dto';
import { UpdateCredentialDto } from './dto/update-credential.dto';
import { CredentialsRepository } from './credentials.repository';

@Injectable()
export class CredentialsService {
  constructor(private readonly credentialsRepository: CredentialsRepository) {}
  create(body: CreateCredentialDto, userId: number) {
    const { title } = body;
    const checkCredential = this.credentialsRepository.findOneByTitle(title , userId);
    if (checkCredential) {
      throw new ConflictException('Credential title already exists');
    }
    return this.credentialsRepository.create(body, userId);
  }

  findAll( userId: number) {
    const credentials = this.credentialsRepository.findAll(userId);
    if (!credentials) throw new NotFoundException('No credentials found');

    return credentials;
  }

  findOne(id: number, userId: number) {
    const credentials = this.credentialsRepository.findOne(id  , userId);
    if(!credentials) throw new ForbiddenException('No credentials found');
    return credentials
  }

  update(id: number, updateCredentialDto: UpdateCredentialDto) {
    return `This action updates a #${id} credential`;
  }

  remove(id: number) {
    return `This action removes a #${id} credential`;
  }
}
