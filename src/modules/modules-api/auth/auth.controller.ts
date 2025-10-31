import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Query,
  Req
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { LoginDto } from './dto/login.dto';
import { Public } from 'src/common/decorators/public.decorator';
import { User } from 'src/common/decorators/user.decorator';
import type { users } from 'generated/prisma';
import { MessageResponse } from 'src/common/decorators/message-response.decorator';
import { ApiBearerAuth } from '@nestjs/swagger';
import { RegisterDto } from './dto/register.dto';
import { QueryDto } from 'src/modules/dto/query.dto';

@Controller('auth')
@ApiBearerAuth()
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('login')
  @Public()
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('register')
  @Public()
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Get('get-info')
  @MessageResponse('Lấy thông tin người dùng thành công')
  getInfo(@User() user: users, @Req() req) {
    console.log(`req`, req.user);
    return this.authService.getInfo(user);
  }

  @Get()
  findByPage(@Query() query: QueryDto) {
    return this.authService.findPaging(query?.page || 1, query?.size || 10);
  }

  @Put() 
  update(@User() user: users, @Body() updateAuthDto: UpdateAuthDto) {
    return this.authService.update(user, updateAuthDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }

  @Post('upload-avatar')
  // upload avatar for user
  uploadAvatar(@User() user: users, @Body() file: Express.Multer.File) {
    return this.authService.uploadAvatar(user.id, file);
  }
}
