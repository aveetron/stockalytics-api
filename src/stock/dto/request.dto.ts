import {
  IsDecimal,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';
import { ItemResponseDto } from 'src/item/dto/response.dto';
import { PaginationRequestDto } from 'src/types/pagination';

export class StockRequestDto extends PaginationRequestDto {
  @IsString()
  id: string;

  @IsObject()
  item: ItemResponseDto;

  @IsDecimal()
  qty: number;

  @IsDecimal()
  buyingPrice: number;

  @IsDecimal()
  sellingPrice: number;

  @IsOptional()
  lastPurchase: Date;
}

export class StockCreateRequestDto {
  @IsNotEmpty({ message: 'StockId cannot be empty' })
  @IsString({ message: 'StockId must be a string' })
  id: string;

  @IsNotEmpty({ message: 'Item cannot be empty' })
  @IsNumber()
  itemId: ItemResponseDto;

  @IsNotEmpty({ message: 'Qty cannot be empty' })
  @IsDecimal()
  qty: number;

  @IsNotEmpty({ message: 'Qty cannot be empty' })
  @IsDecimal()
  buyingPrice: number;

  @IsNotEmpty({ message: 'Qty cannot be empty' })
  @IsDecimal()
  sellingPrice: number;

  @IsOptional()
  lastPurchase: Date;
}
