import { IsNumber, IsString, IsOptional } from "class-validator"

export class AddFavoriteDto {
  @IsNumber()
  movieId: number

  @IsString()
  title: string

  @IsOptional()
  @IsString()
  poster?: string
}
