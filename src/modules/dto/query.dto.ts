
import { IsNotEmpty, IsNumber, IsNumberString, IsOptional, Min } from 'class-validator';

export class QueryDto {
  @IsNumber()
  @Min(1)
  page: number;

  @IsNumber()
  @Min(1)
  size: number;
}
