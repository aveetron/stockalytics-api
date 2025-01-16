import { Injectable } from '@nestjs/common';
import { Category } from './repository/category.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryCreateRequestDto } from './dto/request.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async getCategories(): Promise<Category[]> {
    return this.categoryRepository.find();
  }

  async createCategory(
    categoryCreateRequestDto: CategoryCreateRequestDto,
  ): Promise<Category> {
    return this.categoryRepository.save(categoryCreateRequestDto);
  }

  async getCategory(id: string): Promise<Category> {
    return this.categoryRepository.findOneBy({ id });
  }

  async updateCategory(
    id: string,
    categoryCreateRequestDto: CategoryCreateRequestDto,
  ): Promise<Category> {
    const category = await this.categoryRepository.findOneBy({ id });
    category.name = categoryCreateRequestDto?.name;
    category.description = categoryCreateRequestDto?.description;
    await this.categoryRepository.save(category);
    return this.categoryRepository.findOneBy({ id });
  }

  async deleteCategory(id: string): Promise<void> {
    await this.categoryRepository.delete({ id });
  }
}
