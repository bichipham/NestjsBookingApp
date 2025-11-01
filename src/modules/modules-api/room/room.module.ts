import { Module } from '@nestjs/common';
import { RoomService } from './room.service';
import { RoomController } from './room.controller';
import { CloudinaryModule } from 'src/modules/modules-system/clouddinary/cloudinary.module';

//decorator module
@Module({
  imports: [CloudinaryModule],
  controllers: [RoomController],
  providers: [RoomService],
})
export class RoomModule {}
