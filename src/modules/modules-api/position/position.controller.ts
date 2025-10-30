import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Query,
  Post,
  Put,
} from '@nestjs/common';
import { PositionService } from './position.service';
import { QueryDto } from 'src/modules/dto/query.dto';

interface QueryType {
  page: number;
  size: number;
}

@Controller('position')
export class PositionController {
  constructor(private readonly positionService: PositionService) {}
  //   @Get()
  //   findAll() {
  //     return this.positionService.findAll();
  //   }
  @Post()
  create(@Body() data: any) {
    return this.positionService.create(data);
  }
  @Get()
  findByPage(@Query() query: QueryDto) {
    // find with page
    return this.positionService.findPaging(
      +query?.page || 1,
      +query?.size || 10,
    );
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.positionService.remove(+id);
  }
  @Get(':id')
  // find position by id
  findOne(@Param('id') id: string) {
    return this.positionService.findOne(+id);
  }
  @Put(':id')
  // update position by id
  update(@Param('id') id: string, @Body() data: any) {
    return this.positionService.update(+id, data);
  }
}
