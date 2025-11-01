import { PartialType, OmitType } from '@nestjs/swagger';
import { CreateReviewDto } from './create-review.dto';

export class UpdateReviewDto extends PartialType(
  OmitType(CreateReviewDto, ['booking_id', 'guest_id'] as const),
) {}
