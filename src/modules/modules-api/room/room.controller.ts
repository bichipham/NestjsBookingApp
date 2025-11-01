import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  Put,
  Query,
  UploadedFile,
  UseGuards
} from '@nestjs/common';
import { RoomService } from './room.service';
import { QueryDto } from 'src/modules/dto/query.dto';
import { Roles } from 'src/common/decorators/roles.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { UseInterceptors } from '@nestjs/common';
import { User } from 'src/common/decorators/user.decorator';
import type { users } from 'generated/prisma';

@Controller('room')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}
  
  @Get()
  // Anyone can view rooms list - requires authentication but no specific role
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
  // Anyone can view room details - requires authentication but no specific role
  findOne(@Param('id') id: string) {
    return this.roomService.findOne(+id);
  }
  
  @Get('position/:position')
  // Anyone can view rooms by position - requires authentication but no specific role
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
