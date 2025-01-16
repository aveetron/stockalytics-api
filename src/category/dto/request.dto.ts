import { IsOptional, IsString } from 'class-validator';

export class CategoryCreateRequestDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;
}

export class CategoryUpdateRequestDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description: string;
}
