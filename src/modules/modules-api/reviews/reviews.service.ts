import { Injectable } from '@nestjs/common';
import { CreateReviewDto } from '../../dto/create-review.dto';
import { UpdateReviewDto } from "../../dto/update-review.dto";
import { PrismaService } from 'src/modules/modules-system/prisma/prisma.service';

@Injectable()
export class ReviewsService {
  constructor(
    private readonly prisma: PrismaService,
  ) { }
  create(user, createReviewDto: CreateReviewDto) {
    // add review logic here
    const { booking_id, guest_id, rating, comments } = createReviewDto;

    return this.prisma.reviews.create({
      data: {
        booking_id,
        guest_id,
        rating,
        comments
      },
    });
  }

  // find reviews by room id
  findByRoom(roomId: number) {
    return this.prisma.reviews.findMany({
      where: {
        bookings: {
          room_id: roomId
        }
      },
      include: {
        bookings: true
      }
    });
  }

  // find review by id
  findOne(id: number) {
    return this.prisma.reviews.findUnique({
      where: { id },
      include: {
        bookings: true
      }
    });
  }

  async update(id: number, updateReviewDto: UpdateReviewDto) {
    const res = await this.prisma.reviews.update({
      where: { id },
      data: updateReviewDto
    });
    return { message: `Review with id ${id} updated successfully`, data: res };
  }

  async remove(id: number) {
    const res = await this.prisma.reviews.delete({
      where: { id }
    });
    return {
      message: `Review with id ${id} deleted successfully`
    }
  }
}
