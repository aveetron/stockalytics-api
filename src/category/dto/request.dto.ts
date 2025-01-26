import { IsOptional, IsString } from 'class-validator';
import { PaginationRequestDto } from 'src/types/pagination';

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

export class CategoryRequestDto extends PaginationRequestDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description: string;
}
