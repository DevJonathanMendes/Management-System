import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';

import { AuthModule } from '../auth/auth.module';
import { SellersController } from './sellers.controller';
import { SellersService } from './sellers.service';

@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [SellersController],
  providers: [SellersService],
  exports: [SellersService],
})
export class SellersModule {}
