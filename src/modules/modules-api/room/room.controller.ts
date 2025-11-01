import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  Put,
  Query,
  UploadedFile
} from '@nestjs/common';
import { RoomService } from './room.service';
import { QueryDto } from 'src/modules/dto/query.dto';
import { Roles } from 'src/common/decorators/roles.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { UseInterceptors } from '@nestjs/common';

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
  @Roles('admin')
  create(@Body() data: any) {
    return this.roomService.create(data);
  }
  @Delete(':id')
  @Roles('admin')
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
  @Roles('admin')
  // update room by id
  update(@Param('id') id: string, @Body() data: any) {
    return this.roomService.update(+id, data);
  }

  @Post('upload-image/:id')
  @Roles('admin')
  @UseInterceptors(FileInterceptor('file'))
  // upload image for room
  uploadImage(@Param('id') id: string, @UploadedFile() file: Express.Multer.File) {
    return this.roomService.uploadImage(+id, file);
  }
}
