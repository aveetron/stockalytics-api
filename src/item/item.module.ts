import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from './repository/item.entity';
import { ItemController } from './item.controller';
import { ItemService } from './item.service';
import { CategoryModule } from 'src/category/category.module';
import { UomModule } from 'src/uom/uom.module';

@Module({
  imports: [TypeOrmModule.forFeature([Item]), CategoryModule, UomModule],
  controllers: [ItemController],
  providers: [ItemService],
})
export class ItemModule {}
