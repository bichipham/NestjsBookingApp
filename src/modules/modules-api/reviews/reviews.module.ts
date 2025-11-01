import { Module } from '@nestjs/common';
import { TokenModule } from 'src/modules/modules-system/token/token.module';
import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';

@Module({
  imports: [],
  controllers: [ReviewsController],
  providers: [ReviewsService],
})
export class ReviewsModule {}
