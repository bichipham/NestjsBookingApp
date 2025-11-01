import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateReviewDto {
    @IsNumber()
    @IsNotEmpty()
    booking_id: number;

    @IsNumber()
    @IsNotEmpty()
    guest_id: number;

    @IsNumber()
    @IsNotEmpty()
    rating: number;
    
    @IsString()
    @IsOptional()
    comments: string;
}
