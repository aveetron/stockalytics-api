import { Module } from '@nestjs/common';
import { UomController } from './uom.controller';
import { UomService } from './uom.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UomEntity } from './repository/uom.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UomEntity])],
  controllers: [UomController],
  providers: [UomService],
})
export class UomModule {}
