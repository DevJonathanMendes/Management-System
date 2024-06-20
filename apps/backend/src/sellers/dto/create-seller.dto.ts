import { IsEmail, IsOptional, IsString, Length } from 'class-validator';

export class CreateSellerDto {
  @IsOptional()
  @IsString()
  @Length(2, 128)
  name: string;

  @IsEmail()
  @Length(2, 128)
  email: string;

  @IsString()
  @Length(2, 128)
  username: string;

  @IsString()
  @Length(2, 128)
  password: string;
}
