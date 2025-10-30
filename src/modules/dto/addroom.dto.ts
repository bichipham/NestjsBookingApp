
import { IsBoolean, IsNotEmpty, IsNumber, IsNumberString, IsOptional, Min } from 'class-validator';

export class AddRoomDto {
  // Base on the fields rooms in schema.prisma 
  @IsNotEmpty()
  name: string;

  @IsNumber()
  position_id: number;

  @IsNotEmpty()
  @IsNumberString()
  price: string;

  @IsOptional()
  description?: string;
  @IsOptional()
  @IsNumber()
  max_guests?: number;

  @IsOptional()
  @IsNumber()
  bedroom?: number;

  @IsOptional()
  @IsNumber()
  beds?: number;

  @IsOptional()
  @IsNumber()
  bathroom?: number;

  @IsOptional()
  @IsBoolean()
  is_washing_machine?: boolean;

  @IsOptional()
  @IsBoolean()
  is_iron?: boolean;

  @IsOptional()
  @IsBoolean()
  is_televison?: boolean;

  @IsOptional()
  @IsBoolean()
  is_aircondition?: boolean;

  @IsOptional()
  @IsBoolean()
  is_wifi?: boolean;

  @IsOptional()
  @IsBoolean()
  is_kitchen?: boolean;

  @IsOptional()
  @IsBoolean()
  is_parking?: boolean;

  @IsOptional()
  @IsBoolean()
  is_pool?: boolean;

  @IsOptional()
  main_image?: string;
}

