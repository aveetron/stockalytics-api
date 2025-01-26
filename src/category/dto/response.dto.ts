import { PaginationResponseDto } from 'src/types/pagination';
import { Category } from '../repository/category.entity';

export class CategoryResponseDto {
  id: string;
  name: string;
  description: string;

  static fromEntity(category: Category): CategoryResponseDto {
    return {
      id: category.id,
      name: category.name,
      description: category.description,
    };
  }
}

export class CategoryListResponseDto extends PaginationResponseDto {
  categoris: CategoryResponseDto[];

  constructor(
    start: number,
    limit: number,
    total: number,
    categoris: CategoryResponseDto[],
  ) {
    super(start, limit, total);
    this.categoris = categoris;
  }
}
