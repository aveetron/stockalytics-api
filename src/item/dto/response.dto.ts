import { Item } from '../repository/item.entity';

export class ItemResponseDto {
  id: string;
  name: string;
  description: string;
  uom: string;
  category: string;

  static fromEntity(item: Item): ItemResponseDto {
    return {
      id: item.id,
      name: item.name,
      description: item.description,
      uom: item.uom?.name ?? null,
      category: item.category?.name ?? null,
    };
  }
}
