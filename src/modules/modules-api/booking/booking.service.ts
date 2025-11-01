import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/modules-system/prisma/prisma.service';
import { BookingDto } from '../auth/dto/booking.dto';
import { UpdateBookingDto } from '../auth/dto/update-booking.dto';
import { Prisma, bookings } from 'generated/prisma';
import { BadRequestException } from '@nestjs/common';

@Injectable()
export class BookingService {
  constructor(private readonly prisma: PrismaService) { }
  
  async findRoomsByUser(userId: number): Promise<bookings[]> {
    // Validate userId
    if (!userId || typeof userId !== 'number' || userId <= 0) {
      throw new BadRequestException('Valid user ID is required');
    }

    const userBookings = await this.prisma.bookings.findMany({
      where: { guest_id: userId },
      include: {
        rooms: {
          include: {
            positions: true
          }
        }
      },
      orderBy: {
        checkin_date: 'desc'
      }
    });
    return userBookings;
  }
  async create(data: BookingDto): Promise<bookings> {
    // Validate required fields
    if (!data.guest_id || !data.room_id || !data.checkin_date || !data.checkout_date) {
      throw new BadRequestException('Guest ID, Room ID, check-in date, and check-out date are required');
    }

    // Validate dates
    const checkinDate = new Date(data.checkin_date);
    const checkoutDate = new Date(data.checkout_date);
    
    if (checkinDate >= checkoutDate) {
      throw new BadRequestException('Check-out date must be after check-in date');
    }

    if (checkinDate < new Date()) {
      throw new BadRequestException('Check-in date cannot be in the past');
    }

    // Check if room exists
    const room = await this.prisma.rooms.findUnique({
      where: { id: data.room_id },
    });
    if (!room) {
      throw new BadRequestException('Room not found');
    }

    // Check if guest exists
    const guest = await this.prisma.users.findUnique({
      where: { id: data.guest_id },
    });
    if (!guest) {
      throw new BadRequestException('Guest not found');
    }

    // Check for overlapping bookings
    const overlappingBooking = await this.prisma.bookings.findFirst({
      where: {
        room_id: data.room_id,
        AND: [
          {
            OR: [
              {
                AND: [
                  { checkin_date: { lte: checkinDate } },
                  { checkout_date: { gt: checkinDate } }
                ]
              },
              {
                AND: [
                  { checkin_date: { lt: checkoutDate } },
                  { checkout_date: { gte: checkoutDate } }
                ]
              },
              {
                AND: [
                  { checkin_date: { gte: checkinDate } },
                  { checkout_date: { lte: checkoutDate } }
                ]
              }
            ]
          }
        ],
        status: { not: 'canceled' }
      }
    });

    if (overlappingBooking) {
      throw new BadRequestException('Room is not available for the selected dates');
    }

    try {
      const booking = await this.prisma.bookings.create({
        data: {
          guest_id: data.guest_id,
          room_id: data.room_id,
          checkin_date: checkinDate,
          checkout_date: checkoutDate,
          total_guest: data.total_guest || null,
          total_price: data.total_price || null,
          status: data.status as any || 'pending'
        },
        include: {
          rooms: {
            include: {
              positions: true
            }
          },
          users: true
        }
      });
      return booking;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2003') {
          throw new BadRequestException('Invalid guest_id or room_id provided');
        }
      }
      throw new BadRequestException(`Failed to create booking: ${error.message}`);
    }
  }

  async findPaging(page: number, size: number): Promise<bookings[]> {
    // Validate pagination parameters
    if (page < 1) page = 1;
    if (size < 1) size = 10;
    if (size > 100) size = 100; // Limit max size to prevent performance issues

    const bookings = await this.prisma.bookings.findMany({
      skip: (page - 1) * size,
      take: size,
      include: {
        rooms: {
          include: {
            positions: true
          }
        },
        users: {
          omit: {
            password: true
          }
        }
      },
      orderBy: {
        checkin_date: 'desc'
      }
    });
    return bookings;
  }
  async remove(id: number): Promise<{ message: string }> {
    // Validate id
    if (!id || typeof id !== 'number' || id <= 0) {
      throw new Error('Valid booking ID is required');
    }

    try {
      // Check if booking exists
      const existingBooking = await this.prisma.bookings.findUnique({
        where: { id }
      });

      if (!existingBooking) {
        throw new Error(`Booking with id ${id} not found`);
      }

      const res = await this.prisma.bookings.delete({
        where: { id },
      });

      return { message: 'Booking deleted successfully' };
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new BadRequestException(`Booking with id ${id} not found`);
        }
      }
      throw new BadRequestException(`Failed to delete booking: ${error.message}`);
    }
  }

  async findOne(id: number): Promise<bookings | null> {
    // Validate id
    if (!id || typeof id !== 'number' || id <= 0) {
      throw new BadRequestException('Valid booking ID is required');
    }

    const booking = await this.prisma.bookings.findUnique({
      where: { id },
      include: {
        rooms: {
          include: {
            positions: true
          }
        },
        users: {
          omit: {
            password: true
          }
        }
      }
    });
    return booking;
  }

  async update(id: number, data: UpdateBookingDto): Promise<bookings> {
    // Validate id
    if (!id || typeof id !== 'number' || id <= 0) {
      throw new BadRequestException('Valid booking ID is required');
    }

    // Check if booking exists
    const existingBooking = await this.prisma.bookings.findUnique({
      where: { id }
    });

    if (!existingBooking) {
      throw new BadRequestException(`Booking with id ${id} not found`);
    }

    // Prepare update data with proper type conversion
    const updateData: Prisma.bookingsUncheckedUpdateInput = {};

    if (data.checkin_date !== undefined) {
      updateData.checkin_date = new Date(data.checkin_date);
    }

    if (data.checkout_date !== undefined) {
      updateData.checkout_date = new Date(data.checkout_date);
    }

    if (data.total_guest !== undefined) {
      updateData.total_guest = data.total_guest;
    }

    if (data.total_price !== undefined) {
      updateData.total_price = data.total_price;
    }

    if (data.status !== undefined) {
      // Validate status value against enum
      const validStatuses = ['pending', 'confirmed', 'canceled'];
      if (!validStatuses.includes(data.status)) {
        throw new BadRequestException(`Invalid status. Must be one of: ${validStatuses.join(', ')}`);
      }
      updateData.status = data.status as any;
    }

    // Validate dates if both are provided
    if (updateData.checkin_date && updateData.checkout_date) {
      if (updateData.checkin_date >= updateData.checkout_date) {
        throw new BadRequestException('Check-out date must be after check-in date');
      }
    }

    try {
      const booking = await this.prisma.bookings.update({
        where: { id },
        data: updateData,
        include: {
          rooms: {
            include: {
              positions: true
            }
          },
          users: {
            omit: {
              password: true
            }
          }
        }
      });
      return booking;
    } catch (error) {
      throw new BadRequestException(`Failed to update booking: ${error.message}`);
    }
  }
}
