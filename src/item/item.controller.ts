import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ItemService } from './item.service';
import { Item } from './repository/item.entity';
import { ItemCreateRequestDto, ItemUpdateRequestDto } from './dto/request.dto';

@Controller('item')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Get('/')
  @HttpCode(200)
  async getItems(): Promise<Item[]> {
    return this.itemService.getItems();
  }

  @Post('/')
  @HttpCode(201)
  async createItem(
    @Body() itemCreateRequestDto: ItemCreateRequestDto,
  ): Promise<Item> {
    return this.itemService.createItem(itemCreateRequestDto);
  }

  @Get('/:id')
  @HttpCode(200)
  async getItem(id: string): Promise<Item> {
    return this.itemService.getItem(id);
  }

  @Put('/:id')
  @HttpCode(200)
  async updateItem(
    @Param('id') id: string,
    @Body() itemUpdateRequestDto: ItemUpdateRequestDto,
  ): Promise<Item> {
    return this.itemService.updateItem(id, itemUpdateRequestDto);
  }

  @Delete('/:id')
  @HttpCode(200)
  async deleteItem(id: string): Promise<void> {
    return this.itemService.deleteItem(id);
  }
}
