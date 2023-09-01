import { Injectable } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcrypt";

@Injectable()
export class UsersRepository {

    constructor(private readonly prisma: PrismaClient) {}

    create(body: any){
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
        return this.prisma.users.findUnique({
            where: {
                email: email
            }
        });
    }

}