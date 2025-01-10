import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { UomModule } from './uom/uom.module';
import { UomEntity } from './uom/repository/uom.entity';
import { CustomerModule } from './customer/customer.module';
import { Customer } from './customer/repository/customer.entity';

const dbConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT) || 5432,
  username: process.env.DB_USER || 'admin',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'stockalytics_db',
  entities: [UomEntity, Customer],
  synchronize: true,
};

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...dbConfig,
    }),
    UomModule,
    CustomerModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
