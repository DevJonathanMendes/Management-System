import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CustomersModule } from './customers/customers.module';
import { SellersModule } from './sellers/sellers.module';

@Module({
  imports: [ConfigModule.forRoot(), SellersModule, CustomersModule],
})
export class AppModule {}
