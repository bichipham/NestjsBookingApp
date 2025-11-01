import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Query,
  Post,
  Put,
} from '@nestjs/common';
import { QueryDto } from 'src/modules/dto/query.dto';
import { Roles } from 'src/common/decorators/roles.decorator';
import { BookingService } from './booking.service';
import { BookingDto } from '../auth/dto/booking.dto';
import { User } from 'src/common/decorators/user.decorator';
import type { users } from 'generated/prisma';
import { UpdateBookingDto } from '../auth/dto/update-booking.dto';

@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  // đặt phòng - requires authentication, any user can book
  @Post()
  create(@User() user: users, @Body() data: BookingDto) {
    return this.bookingService.create(data);
  }

  // update đặt phòng - requires authentication, any user can book
  @Put(":id")
  update(@User() user: users, @Param('id') id: string, @Body() data: UpdateBookingDto) {
    return this.bookingService.update(+id, data);
  }

  // xoá đặt phòng - users can delete their own bookings, admins can delete any
  @Delete(':id')
  remove(@User() user: users, @Param('id') id: string) {
    return this.bookingService.remove(+id);
  }

  // danh sách đặt phòng có phân trang - admin can see all, users see their own
  @Get()
  findByPage(@User() user: users, @Query() query: QueryDto) {
    return this.bookingService.findPaging(
      +query?.page || 1,
      +query?.size || 10,
    );
  }

  // lấy danh sách phòng đã đặt của user - requires authentication
  @Get('rooms-by-user/:id')
  findRoomsByUser(@User() user: users, @Param('id') userId: string) {
    return this.bookingService.findRoomsByUser(+userId);
  }
}
