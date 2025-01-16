import { Injectable } from '@nestjs/common';
import { Item } from './repository/item.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ItemCreateRequestDto, ItemUpdateRequestDto } from './dto/request.dto';
import { Repository } from 'typeorm';

@Injectable()
export class ItemService {
  constructor(
    @InjectRepository(Item) private readonly itemRepository: Repository<Item>,
  ) {}

  async getItems(): Promise<Item[]> {
    return this.itemRepository.find();
  }

  async createItem(itemCreateRequestDto: ItemCreateRequestDto): Promise<Item> {
    return this.itemRepository.create(itemCreateRequestDto);
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
