import { IsString, IsOptional, MinLength } from "class-validator"

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @MinLength(2)
  name?: string

  @IsOptional()
  @IsString()
  avatar?: string
}
