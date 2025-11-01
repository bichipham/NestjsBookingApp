import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsNumber, IsNumberString, IsOptional, IsString } from 'class-validator';

export class BookingDto {
  @IsNotEmpty()
	@IsNumber()
	@ApiProperty({ example: 1 })
	guest_id: number;

	@IsNotEmpty()
	@IsNumber()
	@ApiProperty({ example: 1 })
	room_id: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: '2023-01-01' })
  checkin_date: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: '2023-01-02' })
  checkout_date: string;

  @IsOptional()
  @IsNumberString()
  @ApiProperty({ example: 2 })
  total_guest?: number;

  @IsOptional()
  @IsNumberString()
  @ApiProperty({ example: 100.00 })
  total_price?: number;

  @IsOptional()
  @IsString()
  @ApiProperty({ example: 'pending' })
  status?: string;
}