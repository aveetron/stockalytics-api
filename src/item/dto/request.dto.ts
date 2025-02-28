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
  categoryId: string;

  @IsUUID()
  @IsNotEmpty()
  uomId: string;
}

export class ItemUpdateRequestDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsUUID()
  @IsOptional()
  categoryId: string;

  @IsUUID()
  @IsOptional()
  uomId: string;
}
