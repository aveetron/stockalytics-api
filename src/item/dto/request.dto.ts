import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class ItemCreateRequestDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsUUID()
  @IsNotEmpty()
  category: string;

  @IsUUID()
  @IsNotEmpty()
  uom: string;
}

export class ItemUpdateRequestDto extends ItemCreateRequestDto { }