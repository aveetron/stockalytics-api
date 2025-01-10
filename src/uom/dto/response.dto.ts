import { PaginationResponseDto } from 'src/types/pagination';
import { UomEntity } from '../repository/uom.entity';

export class UomResponseDto {
  id: string;
  name: string;

  static fromEntity(entity: UomEntity): UomResponseDto {
    return {
      id: entity.id,
      name: entity.name,
    };
  }
}

export class UomListResponseDto extends PaginationResponseDto {
  uoms: UomResponseDto[];
}
