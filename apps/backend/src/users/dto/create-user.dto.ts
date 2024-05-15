import { IsEmail, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsOptional()
  name: string;
  
  @IsOptional()
  @IsEmail()
  email: string;
  
  @IsString()
  @IsOptional()
  username: string;
  
  @IsString()
  @IsOptional()
  password: string;
}
