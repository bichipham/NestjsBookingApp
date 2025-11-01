import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

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

  // optional fields
  @IsOptional()
  @IsString()
  @ApiProperty({ example: 'John Doe' })
  name: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ example: '0123456789' })
  phone: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ example: 'admin' })
  role: string;

  @IsOptional()
  @IsString()
  birthday: string;

  @IsOptional()
  @IsString()
  gender: string;

}
