/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/modules-system/prisma/prisma.service';

@Injectable()
export class RoomService {
    constructor(private readonly prisma: PrismaService) { }
    async findAll() {
        const rooms = await this.prisma.rooms.findMany();
        return rooms;
    }
}
