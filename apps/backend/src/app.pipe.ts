import { Injectable, PipeTransform } from '@nestjs/common';
import { isEmail } from 'class-validator';

@Injectable()
export class AppPipeTransform implements PipeTransform {
  transform(data: Record<string, any>) {
    const sanitizedData: Record<string, any> = {};
    if (typeof data === 'object') {
      Object.entries(data).forEach(([key, value]) => {
        sanitizedData[key] = this.sanitizeValue(value);
      });

      return sanitizedData;
    }

    return data;
  }

  private sanitizeValue(value: string): string {
    if (typeof value === 'string') {
      value = value.replace(/\s{2,}(?![\d\s]*$)/g, ' ').trim();

      if (isEmail(value)) {
        value = value.toLowerCase();
      }
    }

    return value;
  }
}
