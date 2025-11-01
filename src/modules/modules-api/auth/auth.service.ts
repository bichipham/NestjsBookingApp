import { BadRequestException, Injectable } from '@nestjs/common';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { LoginDto } from './dto/login.dto';
import { PrismaService } from 'src/modules/modules-system/prisma/prisma.service';
// import bcrypt from 'bcrypt';
import * as bcrypt from 'bcrypt';
import { TokenService } from 'src/modules/modules-system/token/token.service';
import { users } from 'generated/prisma';
import { RegisterDto } from './dto/register.dto';
import { CloudinaryService } from 'src/modules/modules-system/clouddinary/cloudinary.service';


@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly tokenService: TokenService,
    private readonly cloudinaryService: CloudinaryService,
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
    const { email, password, name, role } = registerDto;

    const userExits = await this.prisma.users.findUnique({
      where: {
        email: email,
      },
    });

    if (userExits) {
      throw new BadRequestException('Người dùng đã tồn tại, vui lòng đăng nhập');
    }

    const passwordHash = bcrypt.hashSync(password, 10);

    const { password: _, ...userNew } = await this.prisma.users.create({
      data: {
        ...registerDto,
        password: passwordHash
      },
    });

    return { userNew };
  }

 getInfo(user: users) {
    //return user without password
    const { password, ...userInfo } = user || {};
    return userInfo;
  }

  findPaging(page: number, size: number) {
    // get list and remove password field
    return this.prisma.users.findMany({
      skip: (page - 1) * size,
      take: size,
      select: {
        id: true,
        email: true,
        name: true,
        avatar: true,
        role: true,
        phone: true,
        birthday: true,
        gender: true,
      },
    });
  }

  update(user: users, updateAuthDto: UpdateAuthDto) {
    return this.prisma.users.update({
      where: { id: user.id },
      data: updateAuthDto,
    });
  }

  remove(id: number) {
    return this.prisma.users.delete({
      where: { id },
    });
  }
  async uploadAvatar(userId: number, file: Express.Multer.File) {
    // upload cloud
    console.log(`uploadAvatar file`, file);
    if (!file) {
      throw new BadRequestException('File không được để trống');
    }
    const result = await this.cloudinaryService.uploadImage(file);
    
    // update user
    const updated = await this.prisma.users.update({
      where: { id: userId },
      data: {
        avatar: result['secure_url'],
      },
    });
    return {
      avatar: updated.avatar,
      message: 'Upload avatar thành công',
    };
  }
}

