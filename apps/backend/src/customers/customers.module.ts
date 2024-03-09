import { Module } from '@nestjs/common';
import { DbModule } from 'src/db/db.module';
import { CustomersController } from './customers.controller';
import { CustomersService } from './customers.service';

@Module({
  imports: [DbModule],
  controllers: [CustomersController],
  providers: [CustomersService],
})
export class CustomersModule {}
