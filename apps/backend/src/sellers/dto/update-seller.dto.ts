import { IsEmail, IsOptional, IsString, Length } from 'class-validator';
import { CreateSellerDto } from './create-seller.dto';

export class UpdateSellerDto extends CreateSellerDto {
  @IsOptional()
  @IsString()
  @Length(2, 64)
  name: string;

  @IsOptional()
  @IsEmail()
  @Length(2, 64)
  email: string;

  @IsOptional()
  @IsString()
  @Length(2, 64)
  username: string;

  @IsOptional()
  @IsString()
  @Length(2, 64)
  password: string;
}
