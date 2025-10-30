import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ example: 'example@gmail.com' })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: '1234' })
  password: string;

  @IsString()
  @ApiProperty({ example: '1234' })
  name: string;

  @IsString()
  @ApiProperty({ example: '0123456789' })
  phone: string;

  @IsString()
  @ApiProperty({ example: 'admin' })
  role: string;

  @IsString()
  birthday: string;

  @IsString()
  gender: string;

}
