import { IsEmail, IsOptional, IsString, Length } from 'class-validator';

export class CreateSellerDto {
  @IsOptional()
  @IsString()
  @Length(2, 64)
  name: string;

  @IsEmail()
  @Length(2, 64)
  email: string;

  @IsString()
  @Length(2, 64)
  username: string;

  @IsString()
  @Length(8, 64)
  password: string;
}
