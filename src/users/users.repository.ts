import { Injectable } from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { PrismaService } from "../prisma/prisma.service";
import { UserDto } from "./dto/user.dto";

@Injectable()
export class UsersRepository {

    constructor(private readonly prisma: PrismaService) {}

    create(body: UserDto){
     const { password } = body;
      const saltRounds = 10;
      const hashedPassword = bcrypt.hashSync(password, saltRounds);
        return this.prisma.users.create({
            data: {
                  ...body,
                  password: hashedPassword
            }
        });
    }
        
    findOne(email: string){
        return this.prisma.users.findFirst({
            where: {
                email: email
            }
        });
    }
    findOneById(id: number){
        return this.prisma.users.findUnique({
            where: {
                id: id,
            }
        });
    }

}