import { Module } from '@nestjs/common';
import { PositionService } from './position.service';
import { PositionController } from './position.controller';

//decorator module
@Module({
  imports: [],
  controllers: [PositionController],
  providers: [PositionService],
})
export class PositionModule {}
