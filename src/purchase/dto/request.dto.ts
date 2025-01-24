import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsUUID,
  ValidateNested,
} from 'class-validator';

export class CreatePurchaseDetailDTO {
  @IsNotEmpty()
  @IsUUID()
  purchaseId: string;

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
  @IsUUID()
  vendorId: string;

  @IsNotEmpty()
  @IsBoolean()
  isPaid: boolean;

  @ValidateNested({ each: true })
  @Type(() => CreatePurchaseDetailDTO)
  details: CreatePurchaseDetailDTO[];
}
