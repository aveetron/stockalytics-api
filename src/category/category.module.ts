import { Module } from '@nestjs/common';
import { Category } from './repository/category.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { Item } from 'src/item/repository/item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Category, Item])],
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class CategoryModule {}
