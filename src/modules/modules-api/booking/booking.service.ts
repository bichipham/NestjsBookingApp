import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/modules-system/prisma/prisma.service';
import { BookingDto } from '../auth/dto/booking.dto';

@Injectable()
export class BookingService {
  constructor(private readonly prisma: PrismaService) {}
  async findRoomsByUser(userId: number) {
   
  }
  async create(data: BookingDto) {
   // create booking logic
   const booking = await this.prisma.bookings.create({
     data: {
       guest_id: data.guest_id,
       room_id: data.room_id,
       checkin_date: new Date(data.checkin_date),
       checkout_date: new Date(data.checkout_date),
     },
   });
   return booking;
  }

  async findPaging(page: number, size: number) {
    //console.log(page, size);
   
  }
  async remove(id: number) {
   
  }
  async findOne(id: number) {
   
  }
  async update(id: number, data: any) {
    
  }
}
