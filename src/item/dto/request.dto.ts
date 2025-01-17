export class ItemCreateRequestDto {
  name: string;
  description: string;
  categoryId: string;
  uomId: string;
}

export class ItemUpdateRequestDto extends ItemCreateRequestDto {}
