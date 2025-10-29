import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/modules-system/prisma/prisma.service';

@Injectable()
export class PositionService {
  constructor(private readonly prisma: PrismaService) {}
  async findAll() {
    const positions = await this.prisma.positions.findMany();
    return positions;
  }
  async create(data: any) {
    const position = await this.prisma.positions.create({ data });
    return position;
  }
  async findPaging(page: number, size: number) {
    //console.log(page, size);
    const positions = await this.prisma.positions.findMany({
      take: size,
      skip: (page - 1) * size,
    });
    return positions;
  }
  async remove(id: number) {
    await this.prisma.positions.delete({ where: { id } });
    return { message: `Remove position with id ${id}` };
  }
  async findOne(id: number) {
    const position = await this.prisma.positions.findUnique({ where: { id } });
    console.log('Get position:', id, position);
    return position || {};
  }
  async update(id: number, data: any) {
    const position = await this.prisma.positions.update({
      where: { id },
      data,
    });
    return position;
  }
}
