import { Module } from '@nestjs/common';
import { UomController } from './uom.controller';
import { UomService } from './uom.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Uom } from './repository/uom.entity';
import { Item } from 'src/item/repository/item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Uom, Item])],
  controllers: [UomController],
  providers: [UomService],
})
export class UomModule {}
