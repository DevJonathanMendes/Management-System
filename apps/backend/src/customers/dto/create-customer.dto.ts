import { IsEmail, IsOptional, IsString, Length } from 'class-validator';

export class CreateCustomerDto {
  @IsString()
  @Length(2, 64)
  name: string;

  @IsEmail()
  @Length(2, 64)
  email: string;

  @IsOptional()
  @IsString()
  sellerId: string;
}
