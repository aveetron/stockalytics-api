import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsUUID,
  ValidateNested,
} from 'class-validator';

export class CreatePurchaseDetailDTO {
  // @IsNotEmpty()
  // @IsUUID()
  // purchaseId: string;

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

  @IsOptional()
  @IsBoolean()
  isPaid: boolean;

  @IsOptional()
  @IsBoolean()
  isQcPassed: boolean;

  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CreatePurchaseDetailDTO)
  @ArrayNotEmpty()
  details: CreatePurchaseDetailDTO[];
}
