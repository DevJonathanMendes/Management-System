import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';

@Injectable()
export class TransformDataPipe implements PipeTransform {
  transform(data: CreateCustomerDto, metadata: ArgumentMetadata) {
    try {
      this.formatString(data, 'name');
      this.lowerAndTrim(data, 'email');
      this.lowerAndTrim(data, 'telephone');

      return data;
    } catch (err) {
      throw new BadRequestException('Invalid data format');
    }
  }

  private formatString(data: CreateCustomerDto, key: string) {
    if (data[key] && typeof data[key] === 'string')
      data[key] = this.rmSpaces(data[key]);
  }

  private lowerAndTrim(data: CreateCustomerDto, key: string) {
    if (data[key] && typeof data[key] === 'string')
      data[key] = data[key].toLocaleLowerCase().trim();
  }

  private rmSpaces(value: string): string {
    return value.replace(/\s{2,}(?![\d\s]*$)/g, ' ').trim();
  }
}
