import { IsEmail, IsOptional, IsString } from 'class-validator';
import { CreateSellerDto } from './create-seller.dto';

export class UpdateSellerDto extends CreateSellerDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsEmail()
  @IsOptional()
  email: string;

  @IsString()
  @IsOptional()
  username: string;

  @IsString()
  @IsOptional()
  password: string;
}
