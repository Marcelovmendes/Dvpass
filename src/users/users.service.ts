import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { UsersRepository } from "./users.repository";

@Injectable()
export class UsersService {

    constructor( private readonly usersRepository: UsersRepository ) {}
    
    async create(body: any){
        const user = await this.usersRepository.findOne(body.email);
        if(user) throw new ConflictException();
        return this.usersRepository.create(body);
    }

   async getUserByEmail(email: string){
      const user = await this.usersRepository.findOne(email);
      return user;
    }

}