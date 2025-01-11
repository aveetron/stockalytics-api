import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VendorController } from './vendor.controller';
import { VendorService } from './vendor.service';
import { Vendor } from './respository/vendor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Vendor])],
  controllers: [VendorController],
  providers: [VendorService],
})
export class VendorModule {}
