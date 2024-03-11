import { IsEmail, IsNumber, IsNumberString, Length, Max, Min, Validate, isNumberString } from 'class-validator';
import { IsPhone } from 'src/utils/IsPhone';

export class CreateCustomerDto {
  @Length(2, 32)
  name: string;

  @IsEmail()
  email: string;

  @Validate(IsPhone)
  telephone: string;

  @IsNumberString()
  coordinate_x: number;

  @IsNumberString()
  coordinate_y: number;
}
