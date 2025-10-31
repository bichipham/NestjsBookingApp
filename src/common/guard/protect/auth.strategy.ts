import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ACCESS_TOKEN_SECRET } from 'src/common/constant/app.constant';
import { users } from 'generated/prisma';
import { PrismaService } from 'src/modules/modules-system/prisma/prisma.service';
// import { jwtConstants } from './constants';

@Injectable()
export class AuthStrategy extends PassportStrategy(Strategy, 'protect') {
  constructor(private readonly prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false, // không bỏ qua kiểm tra hết hạn => kiểm tra hết hạn
      secretOrKey: ACCESS_TOKEN_SECRET || 'không có token',
    });
  }

  async validate({ userId }: { userId: users['id'] }) {
    console.log(`validate AuthStrategy`, userId);
    const user = await this.prisma.users.findUnique({
      where: {
        id: userId,
      },
      omit: {
        password: true,
      },
    });

    if (!user) {
      return false;
    }

    console.log(`validate`, user);

    return user;
  }
}
