import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { LoginDto } from './dto/login.dto';
import { PrismaService } from 'src/modules/modules-system/prisma/prisma.service';
// import bcrypt from 'bcrypt';
import * as bcrypt from 'bcrypt';
import { TokenService } from 'src/modules/modules-system/token/token.service';
import { users } from 'generated/prisma';
import { RegisterDto } from './dto/register.dto';


@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly tokenService: TokenService,
  ) {}

  async login(loginDto: LoginDto) {
    const { email, password, token } = loginDto;

    const userExits = await this.prisma.users.findUnique({
      where: {
        email: email,
      },
    });
    if (!userExits) {
      throw new BadRequestException(
        'Người dùng chưa tồn tại, vui lòng đăng ký',
      );
    }

    if (!userExits.password) {
      throw new BadRequestException(
        'Vui lòng đăng nhập bằng mạng xã hội (gmail, facebook), để cập nhật lại mật khẩu mới trong setting',
      );
    }

    const isPassword = bcrypt.compareSync(password, userExits.password); // true
    if (!isPassword) throw new BadRequestException('Mật khẩu không chính xác');
    // Nếu code chạy được tới đây => người dùng này hợp lệ

    const tokens = this.tokenService.createTokens(userExits.id);

    return tokens;
  }

  async register(registerDto: RegisterDto) {
    const { email, password, name } = registerDto;

    const userExits = await this.prisma.users.findUnique({
      where: {
        email: email,
      },
    });

    if (userExits) {
      throw new BadRequestException('Ông có tài khoản đăng ký chi nữa');
    }

    const passwordHash = bcrypt.hashSync(password, 10);

    const { password: _, ...userNew } = await this.prisma.users.create({
      data: {
        email: email,
        password: passwordHash,
        name: name,
      },
    });

    console.log({ userNew });

    // delete userNew.password;

    return userNew;
  }

  getInfo(user: users) {
    return { ...user, password: undefined };
  }

  create(createAuthDto: CreateAuthDto) {
    return 'This action adds a new auth';
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
