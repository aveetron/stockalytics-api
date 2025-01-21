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
  ) { }

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
      id: itemCreateRequestDto.category,
    });
    const uom = await this.uomRepository.findOneBy({
      id: itemCreateRequestDto.uom,
    });

    if (!category || !uom) {
      throw new NotFoundException('Category or UOM not found');
    }

    const item = this.itemRepository.create({
      name: itemCreateRequestDto.name,
      description: itemCreateRequestDto.description,
      category, // Map to the Category entity
      uom, // Map to the UOM entity
    });

    const savedItem = await this.itemRepository.save(item);


    return ItemResponseDto.fromEntity(savedItem);
  }

  async getItem(id: string): Promise<ItemResponseDto> {
    const item = await this.itemRepository.findOne({
      where: { id },
      relations: {
        uom: true,
        category: true,
      },
    });
    if (!item) {
      throw new NotFoundException('Item not found');
    }

    return ItemResponseDto.fromEntity(item);
  }

  async updateItem(
    id: string,
    itemUpdateRequestDto: ItemUpdateRequestDto,
  ): Promise<ItemResponseDto> {
    const item = await this.itemRepository.findOneBy({ id });
    if (!item) {
      throw new NotFoundException('Item not found');
    }

    const category = await this.categoryRepository.findOneBy({
      id: itemUpdateRequestDto.category,
    });
    const uom = await this.uomRepository.findOneBy({
      id: itemUpdateRequestDto.uom,
    });

    if (!category || !uom) {
      throw new NotFoundException('Category or UOM not found');
    }

    // Update fields
    item.name = itemUpdateRequestDto.name;
    item.description = itemUpdateRequestDto.description;
    item.category = category;
    item.uom = uom;

    const updatedItem = await this.itemRepository.save(item);

    return ItemResponseDto.fromEntity(updatedItem);
  }

  async deleteItem(id: string): Promise<void> {
    await this.itemRepository.delete({ id });
  }
}