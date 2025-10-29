import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RoomModule } from './modules/modules-api/room/room.module';
import { PrismaModule } from './modules/modules-system/prisma/prisma.module';
import { PositionModule } from './modules/modules-api/position/position.module';
@Module({
  imports: [RoomModule, PositionModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
