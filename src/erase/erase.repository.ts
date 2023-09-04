import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class EraseRepository {
    constructor(private readonly prisma: PrismaService) {}
        
     async remove(userId :number){
        await this.prisma.card.deleteMany({
            where: {
                userId: userId,
            },
        })
        await this.prisma.credentials.deleteMany({
            where: {
                userId: userId,
            },
        })
        await this.prisma.notes.deleteMany({
            where: {
                userId: userId,
            },
        })
        await this.prisma.users.delete({
            where: {
                id: userId,
            },
        })
     }
 
    }

