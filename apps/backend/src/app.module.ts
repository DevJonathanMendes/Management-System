import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from './auth/auth.module';
import { SellersModule } from './sellers/sellers.module';

@Module({
  imports: [ConfigModule.forRoot(), AuthModule, SellersModule],
})
export class AppModule {}
