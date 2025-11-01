import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from '../../dto/create-review.dto';
import { UpdateReviewDto } from '../../dto/update-review.dto';
import { User } from 'src/common/decorators/user.decorator';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Post()
  create(@User() user, @Body() createReviewDto: CreateReviewDto) {
    return this.reviewsService.create(user,createReviewDto);
  }

  @Get("find-by-room/:id")
  findByRoom(@Param('id') id: string) {
    return this.reviewsService.findByRoom(+id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reviewsService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateReviewDto: UpdateReviewDto) {
    return this.reviewsService.update(+id, updateReviewDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reviewsService.remove(+id);
  }
}
