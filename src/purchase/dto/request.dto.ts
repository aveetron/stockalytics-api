import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsUUID, ValidateNested } from 'class-validator';

export class CreatePurchaseDetailDTO {
  @IsNotEmpty()
  @IsUUID()
  itemId: string;

  @IsNotEmpty()
  @IsNumber()
  qty: number;

  @IsNotEmpty()
  @IsNumber({ maxDecimalPlaces: 2 })
  unitPrice: number;
}

export class CreatePurchaseDTO {
  @IsNotEmpty()
  @IsNumber({ maxDecimalPlaces: 2 })
  total: number;

  @IsNotEmpty()
  @IsUUID()
  vendorId: string;

  @ValidateNested({ each: true })
  @Type(() => CreatePurchaseDetailDTO)
  purchaseDetails: CreatePurchaseDetailDTO[];
}
