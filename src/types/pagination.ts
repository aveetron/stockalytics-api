import { Type } from 'class-transformer';
import { IsInt, IsOptional, Max, Min } from 'class-validator';

export class PaginationRequestDto {
  @IsInt()
  @IsOptional()
  @Min(1)
  @Type(() => Number)
  start: number = 1;

  @IsInt()
  @IsOptional()
  @Min(1)
  @Max(100)
  @Type(() => Number)
  limit: number = 10;
}

export class PaginationResponseDto {
  start: number = 0;
  limit: number = 20;
  total: number = 20;
}
