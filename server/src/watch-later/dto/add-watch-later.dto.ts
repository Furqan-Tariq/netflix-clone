import { IsNumber, IsString, IsOptional } from 'class-validator';

export class AddWatchLaterDto {
  @IsNumber()
  movieId: number;

  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  poster?: string;
}
