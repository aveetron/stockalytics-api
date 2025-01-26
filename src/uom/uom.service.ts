import { BadRequestException, Injectable } from '@nestjs/common';
import { Uom } from './repository/uom.entity';
import { ILike, Repository } from 'typeorm';
import {
  UomCreateRequestDto,
  UomRequestDto,
  UomUpdateRequestDto,
} from './dto/request.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UomListResponseDto, UomResponseDto } from './dto/response.dto';

@Injectable()
export class UomService {
  constructor(
    @InjectRepository(Uom)
    private readonly uomRepository: Repository<Uom>,
  ) {}

  async getUoms(
    uomRequestDto: UomRequestDto,
    name?: string,
  ): Promise<UomListResponseDto> {
    const [uoms, total] = await this.uomRepository.findAndCount({
      where: name ? { name: ILike(`%${name}%`) } : undefined,
      skip: uomRequestDto.start,
      take: uomRequestDto.limit,
    });

    const uomDtos = uoms.map((uom) => UomResponseDto.fromEntity(uom));

    return new UomListResponseDto(
      uomRequestDto.start,
      uomRequestDto.limit,
      total,
      uomDtos,
    );
  }

  async createUom(
    uomCreateRequestDto: UomCreateRequestDto,
  ): Promise<UomResponseDto> {
    uomCreateRequestDto.name = uomCreateRequestDto.name.trim().toLowerCase();
    // check this UOM already exists
    const existingUom = await this.uomRepository.findOneBy({
      name: uomCreateRequestDto.name,
    });
    if (existingUom) {
      throw new BadRequestException('UOM already exists');
    }

    return UomResponseDto.fromEntity(
      await this.uomRepository.save(uomCreateRequestDto),
    );
  }

  async getUom(id: string): Promise<UomResponseDto> {
    return UomResponseDto.fromEntity(
      await this.uomRepository.findOneBy({ id }),
    );
  }

  async updateUom(
    id: string,
    uomUpdateRequestDto: UomUpdateRequestDto,
  ): Promise<UomResponseDto> {
    const uom = await this.uomRepository.findOneBy({ id });
    // check uom exists or not
    if (!uom) {
      throw new BadRequestException('UOM not found');
    }

    // now check this name already exists or not
    const existingUom = await this.uomRepository.findOneBy({
      name: uomUpdateRequestDto.name,
    });
    if (existingUom) {
      throw new BadRequestException('UOM already exists');
    }
    uom.name = uomUpdateRequestDto.name;
    return UomResponseDto.fromEntity(await this.uomRepository.save(uom));
  }

  async deleteUom(id: string): Promise<void> {
    this.uomRepository.remove(await this.uomRepository.findOneBy({ id }));
  }
}
