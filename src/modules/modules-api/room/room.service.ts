import { Injectable } from '@nestjs/common';

@Injectable()
export class RoomService {
  findAll() {
    return ['Room 1', 'Room 2', 'Room 3'];
  }
}
