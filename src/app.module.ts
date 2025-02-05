import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { UomModule } from './uom/uom.module';
import { Uom } from './uom/repository/uom.entity';
import { CustomerModule } from './customer/customer.module';
import { Customer } from './customer/repository/customer.entity';
import { VendorModule } from './vendor/vendor.module';
import { Vendor } from './vendor/respository/vendor.entity';
import { CategoryModule } from './category/category.module';
import { Item } from './item/repository/item.entity';
import { ItemModule } from './item/item.module';
import { Category } from './category/repository/category.entity';
import {
  Purchase,
  PurchaseDetail,
} from './purchase/repository/purchase.entity';
import { PurchaseModule } from './purchase/purchase.module';
import { StockModule } from './stock/stock.module';
import { AuthModule } from './auth/auth.module';
import { Auth } from './auth/repository/auth.entity';

const dbConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT) || 5432,
  username: process.env.DB_USER || 'admin',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'stockalytics_db',
  entities: [
    Uom,
    Customer,
    Vendor,
    Category,
    Item,
    Purchase,
    PurchaseDetail,
    Auth,
  ],
  synchronize: true,
};

@Module({
  // database config
  imports: [
    TypeOrmModule.forRoot({
      ...dbConfig,
    }),
    // modules config
    UomModule,
    CustomerModule,
    VendorModule,
    CategoryModule,
    ItemModule,
    PurchaseModule,
    StockModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
