import { Injectable, NotFoundException } from '@nestjs/common';
import { Item } from './repository/item.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ItemCreateRequestDto, ItemUpdateRequestDto } from './dto/request.dto';
import { Repository } from 'typeorm';
import { ItemResponseDto } from './dto/response.dto';
import { Uom } from 'src/uom/repository/uom.entity';
import { Category } from 'src/category/repository/category.entity';

@Injectable()
export class ItemService {
  constructor(
    @InjectRepository(Item)
    private readonly itemRepository: Repository<Item>,
    @InjectRepository(Uom)
    private readonly uomRepository: Repository<Uom>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async getItems(): Promise<Item[]> {
    return this.itemRepository.find({
      relations: ['category', 'uom'],
    });
  }

  async createItem(
    itemCreateRequestDto: ItemCreateRequestDto,
  ): Promise<ItemResponseDto> {
    // First find the related entities
    const category = await this.categoryRepository.findOneBy({
      id: itemCreateRequestDto.categoryId,
    });
    const uom = await this.uomRepository.findOneBy({
      id: itemCreateRequestDto.uomId,
    });

    if (!category || !uom) {
      throw new NotFoundException('Category or UOM not found');
    }

    const item = await this.itemRepository.save({
      name: itemCreateRequestDto.name,
      description: itemCreateRequestDto.description,
      category,
      uom,
    });

    return ItemResponseDto.fromEntity(item);
  }

  async getItem(id: string): Promise<Item> {
    return this.itemRepository.findOneBy({ id });
  }

  async updateItem(id: string, itemUpdateRequestDto: ItemUpdateRequestDto) {
    return this.itemRepository.save({ ...itemUpdateRequestDto, id });
  }

  async deleteItem(id: string): Promise<void> {
    await this.itemRepository.delete({ id });
  }
}
