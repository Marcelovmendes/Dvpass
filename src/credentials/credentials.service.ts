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
  async create(body: CreateCredentialDto, userId: number) {
    const { title } = body;
    const checkCredential = await this.credentialsRepository.findOneByTitle(title , userId);
    if (checkCredential) {
      console.log(checkCredential, 'credentials')
      throw new ConflictException('Credential title already exists');
    }
    return this.credentialsRepository.create(body, userId);
  }

  async findAll( userId: number) {
    const credentials =  await this.credentialsRepository.findAll(userId);
    if (!credentials) throw new NotFoundException('No credentials found');

    return credentials;
  }

  async findOne(id: number, userId: number) {
    const credentials =  await this.credentialsRepository.findOne(id  , userId);
    if(!credentials) throw new ForbiddenException('No credentials found');
    return credentials
  }

}
