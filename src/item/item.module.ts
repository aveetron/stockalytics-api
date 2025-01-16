import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from './repository/item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Item])],
  controllers: [],
  providers: [],
})
export class ItemModule {}
