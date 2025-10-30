import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  Put,
  Query
} from '@nestjs/common';
import { RoomService } from './room.service';
import { QueryDto } from 'src/modules/dto/query.dto';

@Controller('room')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}
  @Get()
  findByPage(@Query() query: QueryDto) {
     // find with page
     return this.roomService.findPaging(
       +query?.page || 1,
       +query?.size || 10,
     );
   }
  @Post()
  create(@Body() data: any) {
    return this.roomService.create(data);
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roomService.remove(+id);
  }
  @Get(':id')
  // find room by id
  findOne(@Param('id') id: string) {
    return this.roomService.findOne(+id);
  }
  @Get('position/:position')
  //find room by position
  findByLocation(@Param('position') position: string) {
    return this.roomService.findByLocation(+position);
  }
  @Put(':id')
  // update room by id
  update(@Param('id') id: string, @Body() data: any) {
    return this.roomService.update(+id, data);
  }
  @Post('upload')
  // upload image for room
  uploadImage() {
    return this.roomService.uploadImage();
  }
}
