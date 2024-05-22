import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { SellersModule } from './sellers/sellers.module';

@Module({
  imports: [ConfigModule.forRoot(), SellersModule],
})
export class AppModule {}
