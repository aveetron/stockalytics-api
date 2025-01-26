import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import {
  CategoryCreateRequestDto,
  CategoryRequestDto,
  CategoryUpdateRequestDto,
} from './dto/request.dto';
import { Category } from './repository/category.entity';
import { CategoryListResponseDto } from './dto/response.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get('/')
  @HttpCode(200)
  async getCategories(
    @Query() categoryRequestDto: CategoryRequestDto,
  ): Promise<CategoryListResponseDto> {
    return this.categoryService.getCategories(categoryRequestDto);
  }

  @Post('/')
  @HttpCode(201)
  async createCategory(
    @Body() categoryCreateRequestDto: CategoryCreateRequestDto,
  ): Promise<Category> {
    return this.categoryService.createCategory(categoryCreateRequestDto);
  }

  @Get('/:id')
  @HttpCode(200)
  async getCategory(@Param('id') id: string): Promise<Category> {
    return this.categoryService.getCategory(id);
  }

  @Put('/:id')
  @HttpCode(200)
  async updateCategory(
    @Param('id') id: string,
    @Body() categoryUpdateRequestDto: CategoryUpdateRequestDto,
  ): Promise<Category> {
    return this.categoryService.updateCategory(id, categoryUpdateRequestDto);
  }

  @Delete('/:id')
  @HttpCode(200)
  async deleteCategory(@Param('id') id: string): Promise<void> {
    return this.categoryService.deleteCategory(id);
  }
}
