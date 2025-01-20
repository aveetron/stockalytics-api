import { Module } from '@nestjs/common';
import { Purchase, PurchaseDetail } from './repository/purchase.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PurchaseController } from './purchase.controller';
import { PurchaseService } from './purchase.service';

@Module({
  imports: [TypeOrmModule.forFeature([Purchase, PurchaseDetail])],
  controllers: [PurchaseController],
  providers: [PurchaseService],
})
export class PurchaseModule {}
