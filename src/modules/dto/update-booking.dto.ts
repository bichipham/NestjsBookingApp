import { PartialType, OmitType } from '@nestjs/mapped-types';
import { BookingDto } from './booking.dto';

export class UpdateBookingDto extends PartialType(
  OmitType(BookingDto, ['room_id', 'guest_id'] as const),
) {}