import { Module } from '@nestjs/common';
import { TokenModule } from 'src/modules/modules-system/token/token.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { CloudinaryModule } from 'src/modules/modules-system/clouddinary/cloudinary.module';


@Module({
  imports: [TokenModule, CloudinaryModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
