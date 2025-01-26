import { Injectable } from '@nestjs/common';
import { Category } from './repository/category.entity';
import { ILike, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {
  CategoryCreateRequestDto,
  CategoryRequestDto,
} from './dto/request.dto';
import {
  CategoryListResponseDto,
  CategoryResponseDto,
} from './dto/response.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async getCategories(
    categoryRequestDto: CategoryRequestDto,
  ): Promise<CategoryListResponseDto> {
    const [categories, total] = await this.categoryRepository.findAndCount({
      // check if search is not empty
      ...(categoryRequestDto.search && {
        where: [
          {
            name: ILike(`%${categoryRequestDto.search}%`),
          },
          {
            description: ILike(`%${categoryRequestDto.search}%`),
          },
        ],
      }),
      skip: categoryRequestDto.start,
      take: categoryRequestDto.limit,
    });

    const categoryDtos = categories.map((category) =>
      CategoryResponseDto.fromEntity(category),
    );

    return new CategoryListResponseDto(
      categoryRequestDto.start,
      categoryRequestDto.limit,
      total,
      categoryDtos,
    );
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
