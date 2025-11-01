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

@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  // đặt phòng
  @Post()
  create( @Body() data: BookingDto) {
    return this.bookingService.create(data);
  }

  // xoá đặt phòng
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookingService.remove(+id);
  }

  // thông tin đặt phòng theo id
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookingService.findOne(+id);
  }

  // cập nhật đặt phòng
  @Put(':id')
  update(@Param('id') id: string, @Body() data: any) {
    return this.bookingService.update(+id, data);
  }

  // danh sách đặt phòng có phân trang
  @Get()
  findByPage(@Query() query: QueryDto) {
    return this.bookingService.findPaging(
      +query?.page || 1,
      +query?.size || 10,
    );
  }

  @Get('rooms-by-user/:id')
  findRoomsByUser(@Param('id') userId: string) {
    return this.bookingService.findRoomsByUser(+userId);
  }
}
