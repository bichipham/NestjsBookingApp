import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RoomModule } from './modules/modules-api/room/room.module';
import { PrismaModule } from './modules/modules-system/prisma/prisma.module';
import { PositionModule } from './modules/modules-api/position/position.module';
import { AuthModule } from './modules/modules-api/auth/auth.module';
import { AuthStrategy } from './common/guard/protect/auth.strategy';
import { CloudinaryModule } from './modules/modules-system/clouddinary/cloudinary.module';
import { TokenModule } from './modules/modules-system/token/token.module';
import { ProtectGuard } from './common/guard/protect/protect.guard';
import { BookingModule } from './modules/modules-api/booking/booking.module';
import { ReviewsModule } from './modules/modules-api/reviews/reviews.module';
@Module({
  imports: [RoomModule, PositionModule, 
    AuthModule, PrismaModule, BookingModule, TokenModule, CloudinaryModule, ReviewsModule],
  controllers: [AppController],
  providers: [AppService, ProtectGuard, AuthStrategy],
})
export class AppModule {}
