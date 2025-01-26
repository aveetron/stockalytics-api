import { BadRequestException, Injectable } from '@nestjs/common';
import { Category } from './repository/category.entity';
import { ILike, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {
  CategoryCreateRequestDto,
  CategoryRequestDto,
  CategoryUpdateRequestDto,
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
  ): Promise<CategoryResponseDto> {
    // check this name exists or not
    const existingCategory = await this.categoryRepository.findOneBy({
      name: categoryCreateRequestDto.name,
    });
    if (existingCategory) {
      throw new BadRequestException('Category already exists');
    }
    return CategoryResponseDto.fromEntity(
      await this.categoryRepository.save(categoryCreateRequestDto),
    );
  }

  async getCategory(id: string): Promise<CategoryResponseDto> {
    const category = await this.categoryRepository.findOneBy({ id });
    return CategoryResponseDto.fromEntity(category);
  }

  async updateCategory(
    id: string,
    categoryUpdateRequestDto: CategoryUpdateRequestDto,
  ): Promise<CategoryResponseDto> {
    // check if category payload is empty
    if (Object.keys(categoryUpdateRequestDto).length === 0) {
      throw new BadRequestException('Category payload is empty');
    }

    // check this name already exists or not
    if (categoryUpdateRequestDto.name) {
      categoryUpdateRequestDto.name = categoryUpdateRequestDto.name.trim();
      const existingCategory = await this.categoryRepository.findOneBy({
        name: categoryUpdateRequestDto.name,
      });
      if (existingCategory) {
        throw new BadRequestException('Category already exists');
      }
    }

    const category = await this.categoryRepository.save({
      ...(await this.categoryRepository.findOneBy({ id })),
      ...categoryUpdateRequestDto,
    });
    return CategoryResponseDto.fromEntity(category);
  }

  async deleteCategory(id: string): Promise<void> {
    await this.categoryRepository.delete({ id });
  }
}
