import { PaginationResponseDto } from 'src/types/pagination';
import { Uom } from '../repository/uom.entity';

export class UomResponseDto {
  id: string;
  name: string;

  static fromEntity(entity: Uom): UomResponseDto {
    return {
      id: entity.id,
      name: entity.name,
    };
  }
}

export class UomListResponseDto extends PaginationResponseDto {
  uoms: UomResponseDto[];

  constructor(
    start: number,
    limit: number,
    total: number,
    uoms: UomResponseDto[],
  ) {
    super(start, limit, total);
    this.uoms = uoms;
  }
}
