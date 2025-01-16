import { Controller, Delete, Get, HttpCode, Post, Put } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryCreateRequestDto } from './dto/request.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get('/')
  @HttpCode(200)
  async getCategories() {
    return this.categoryService.getCategories();
  }

  @Post('/')
  @HttpCode(201)
  async createCategory(categoryCreateRequestDto: CategoryCreateRequestDto) {
    return this.categoryService.createCategory(categoryCreateRequestDto);
  }

  @Get('/:id')
  @HttpCode(200)
  async getCategory(id: string) {
    return this.categoryService.getCategory(id);
  }

  @Put('/:id')
  @HttpCode(200)
  async updateCategory(id: string, category: any) {
    return this.categoryService.updateCategory(id, category);
  }

  @Delete('/:id')
  @HttpCode(200)
  async deleteCategory(id: string) {
    return this.categoryService.deleteCategory(id);
  }
}
