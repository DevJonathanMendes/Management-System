import { IsEmail, IsOptional, IsString, Length } from 'class-validator';

export class CreateCustomerDto {
  id: string;

  @IsString()
  @Length(2, 128)
  name: string;

  @IsEmail()
  @Length(2, 128)
  email: string;

  @IsOptional()
  @IsString()
  seller_id: string;
}
