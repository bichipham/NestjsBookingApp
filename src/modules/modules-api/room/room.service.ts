import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/modules-system/prisma/prisma.service';

@Injectable()
export class RoomService {
  constructor(private readonly prisma: PrismaService) {}
  async findAll() {
    const rooms = await this.prisma.rooms.findMany();
    return rooms;
  }
  // add room
  async create(data: any) {
    const room = await this.prisma.rooms.create({ data });
    return room;
  }
  // delete room by id
  async remove(id: number) {
    const room = await this.prisma.rooms.delete({ where: { id } });
    return room;
  }
  // find room by id
  async findOne(id: number) {
    const room = await this.prisma.rooms.findUnique({ where: { id } });
    return room;
  }
  // find room by location
  async findByLocation(position: number) {
    const rooms = await this.prisma.rooms.findMany({
      where: { position_id: position },
    });
    return rooms;
  }
  // update room by id
  async update(id: number, data: any) {
    const room = await this.prisma.rooms.update({
      where: { id },
      data,
    });
    return room;
  }
  // upload image for room
  async uploadImage() {
    return { message: 'Upload image for room' };
  }
}
