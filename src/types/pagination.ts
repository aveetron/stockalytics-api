import { Type } from 'class-transformer';
import { IsInt, IsOptional, Max, Min } from 'class-validator';

export class PaginationRequestDto {
  @IsInt()
  @Min(0)
  @IsOptional()
  @Type(() => Number)
  start: number = 0;

  @IsInt()
  @Max(100)
  @IsOptional()
  @Min(1)
  @Type(() => Number)
  limit: number = 10;
}

export class PaginationResponseDto {
  start: number;
  limit: number;
  total: number;

  constructor(start: number, limit: number, total: number) {
    this.start = start;
    this.limit = limit;
    this.total = total;
  }
}
