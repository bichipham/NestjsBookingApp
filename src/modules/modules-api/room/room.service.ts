import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/modules-system/prisma/prisma.service';
import { BadRequestException } from '@nestjs/common';
import { AddRoomDto } from 'src/modules/dto/addroom.dto';
import { CloudinaryService } from 'src/modules/modules-system/clouddinary/cloudinary.service';
@Injectable()
export class RoomService {
  constructor(private readonly prisma: PrismaService, private readonly cloudinaryService: CloudinaryService) { }
  async findPaging(page: number, size: number) {
    const rooms = await this.prisma.rooms.findMany({
      include: {
        positions: true // Include position information
      },
      skip: (page - 1) * size,
      take: size
    });
    return rooms;
  }
  // add room
  async create(data: AddRoomDto) {
    // Validate required fields using type-safe approach
    if (!data.name || typeof data.name !== 'string' || data.name.trim() === '') {
      throw new BadRequestException('Room name is required and must be a non-empty string');
    }

    if (!data.position_id || typeof data.position_id !== 'number') {
      throw new BadRequestException('Position ID is required and must be a number');
    }

    if (!data.price || (typeof data.price !== 'number' && typeof data.price !== 'string')) {
      throw new BadRequestException('Price is required and must be a number or decimal string');
    }

    // Validate that position exists before creating room
    const positionExists = await this.prisma.positions.findUnique({
      where: { id: data.position_id }
    });

    if (!positionExists) {
      throw new BadRequestException(`Position with ID ${data.position_id} does not exist`);
    }

    try {
      const room = await this.prisma.rooms.create({
        data: {
          ...data,
          // Ensure decimal price is properly handled
          price: typeof data.price === 'string' ? parseFloat(data.price) : data.price
        }
      });
      return room;
    } catch (error) {
      throw new BadRequestException(`Failed to create room: ${error.message}`);
    }
  }
  // delete room by id
  async remove(id: number): Promise<{ message: string }> {
    // Validate id
    if (!id || typeof id !== 'number' || id <= 0) {
      throw new BadRequestException('Valid room ID is required');
    }

    try {
      // check if can not delete not exists room
      const room = await this.prisma.rooms.findUnique({ where: { id } });
      if (!room) {
        throw new BadRequestException(`Room with id ${id} does not exist`);
      }
      await this.prisma.rooms.delete({ where: { id } });
      return { message: `Remove room with id ${id}` };
    } catch (error) {
      throw new BadRequestException(`Failed to delete room: ${error.message}`);
    }
  }

  // find room by id
  async findOne(id: number) {
    // Validate id
    if (!id || typeof id !== 'number' || id <= 0) {
      throw new BadRequestException('Valid room ID is required');
    }

    const room = await this.prisma.rooms.findUnique({
      where: { id },
      include: {
        positions: true // Include position information
      }
    });
    return !room ? { 'message': `Room with id ${id} not found` } : room;
  }
  // find room by location
  async findByLocation(position: number) {
    // Validate position
    if (!position || typeof position !== 'number' || position <= 0) {
      throw new Error('Valid position ID is required');
    }

    // Check if position exists
    const positionExists = await this.prisma.positions.findUnique({
      where: { id: position }
    });

    if (!positionExists) {
      throw new BadRequestException(`Position with ID ${position} does not exist`);
    }

    const rooms = await this.prisma.rooms.findMany({
      where: { position_id: position },
      include: {
        positions: true // Include position information
      }
    });
    return rooms;
  }
  // update room by id
  async update(id: number, data) {
    // Check room exists
    const roomExists = await this.prisma.rooms.findUnique({ where: { id } });
    if (!roomExists) {
      throw new BadRequestException(`Room with id ${id} not found`);
    }

    // If position_id is being updated, validate it exists
    if (data.position_id !== undefined && data.position_id !== null) {
      const positionExists = await this.prisma.positions.findUnique({
        where: { id: data.position_id as number }
      });
      if (!positionExists) {
        throw new BadRequestException(`Position with ID ${data.position_id} does not exist`);
      }
    }

    try {
      const room = await this.prisma.rooms.update({
        where: { id },
        data: {
          ...data,
          // Ensure decimal price is properly handled if provided
          ...(data.price && {
            price: typeof data.price === 'string' ? parseFloat(data.price) : data.price
          })
        },
      });
      return room;
    } catch (error) {
      throw new BadRequestException(`Failed to update room: ${error.message}`);
    }
  }
  // upload image for room
  async uploadImage(id: number, file: Express.Multer.File) {
    console.log(`uploadAvatar file`, file);
    if (!file) {
      throw new BadRequestException('File không được để trống');
    }
    // check room exists
    const roomExists = await this.prisma.rooms.findUnique({ where: { id } });
    if (!roomExists) {
      throw new BadRequestException(`Room with id ${id} not found`);
    }

    // upload image to cloudinary
    const result = await this.cloudinaryService.uploadImage(file);

    // update room
    const updated = await this.prisma.rooms.update({
      where: { id: id },
      data: {
        main_image: result['secure_url'],
      },
    });
    return {
      image: updated.main_image,
      message: 'Upload image thành công',
    };
  }
}
