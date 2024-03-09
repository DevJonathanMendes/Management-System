import { IsEmail, IsNumber, Length, Max, Min, Validate } from 'class-validator';
import { IsPhone } from 'src/utils/IsPhone';

export class CreateCustomerDto {
  @Length(2, 32)
  name: string;

  @IsEmail()
  email: string;

  @Validate(IsPhone)
  telephone: string;

  @IsNumber()
  @Min(1)
  @Max(100000)
  coordinate_x: number;

  @IsNumber()
  @Min(1)
  @Max(100000)
  coordinate_y: number;
}
