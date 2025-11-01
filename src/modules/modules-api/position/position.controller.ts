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
import { Roles } from 'src/common/decorators/roles.decorator';
import { User } from 'src/common/decorators/user.decorator';
import type { users } from 'generated/prisma';

interface QueryType {
  page: number;
  size: number;
}

@Controller('position')
export class PositionController {
  constructor(private readonly positionService: PositionService) {}
  
  @Post()
  @Roles('admin')
  create(@Body() data: any) {
    return this.positionService.create(data);
  }
  
  @Get()
  // Anyone can view positions list - requires authentication but no specific role
  findByPage(@Query() query: QueryDto) {
    // find with page
    return this.positionService.findPaging(
      +query?.page || 1,
      +query?.size || 10,
    );
  }
  
  @Delete(':id')
  @Roles('admin')
  remove(@Param('id') id: string) {
    return this.positionService.remove(+id);
  }
  
  @Get(':id')
  // Anyone can view position details - requires authentication but no specific role
  findOne(@Param('id') id: string) {
    return this.positionService.findOne(+id);
  }
  
  @Put(':id')
  @Roles('admin')
  // update position by id
  update(@Param('id') id: string, @Body() data: any) {
    return this.positionService.update(+id, data);
  }
}
