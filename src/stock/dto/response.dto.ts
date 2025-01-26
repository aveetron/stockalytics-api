import {
  IsDate,
  IsNumber,
  IsObject,
  IsOptional,
  IsUUID,
} from 'class-validator';

export class StockResponseDto {
  @IsUUID()
  id: string;

  @IsObject({
    message: 'Item must be an object',
  })
  item: object;

  @IsNumber()
  qty: number;

  @IsNumber()
  buyingPrice: number;

  @IsNumber()
  sellingPrice: number;

  @IsOptional()
  @IsDate()
  lastPurchase: Date;
}
