import { Module } from '@nestjs/common';
import { Purchase, PurchaseDetail } from './repository/purchase.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PurchaseController } from './purchase.controller';
import { PurchaseService } from './purchase.service';
import { Vendor } from 'src/vendor/respository/vendor.entity';
import { Item } from 'src/item/repository/item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Purchase, PurchaseDetail, Vendor, Item])],
  controllers: [PurchaseController],
  providers: [PurchaseService],
})
export class PurchaseModule {}
