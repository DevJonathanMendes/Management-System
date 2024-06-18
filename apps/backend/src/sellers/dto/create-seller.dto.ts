import { IsEmail, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateSellerDto {
  @IsOptional()
  @IsString()
  @MaxLength(64)
  name: string;

  @IsEmail()
  @MaxLength(64)
  email: string;

  @IsString()
  @MaxLength(64)
  username: string;

  @IsString()
  @MaxLength(64)
  password: string;
}
