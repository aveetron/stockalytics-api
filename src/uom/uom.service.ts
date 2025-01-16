import { Injectable } from '@nestjs/common';
import { Uom } from './repository/uom.entity';
import { ILike, Repository } from 'typeorm';
import { UomCreateRequestDto, UomUpdateRequestDto } from './dto/request.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UomService {
  constructor(
    @InjectRepository(Uom)
    private readonly uomRepository: Repository<Uom>,
  ) {}

  async getUoms(): Promise<Uom[]> {
    return this.uomRepository.find();
  }

  async getUomsByName(name: string): Promise<Uom[]> {
    return this.uomRepository.find({
      where: { name: ILike(`%${name}%`) },
    });
  }

  async createUom(uomCreateRequestDto: UomCreateRequestDto): Promise<Uom> {
    return this.uomRepository.save(uomCreateRequestDto);
  }

  async getUom(id: string): Promise<Uom> {
    return this.uomRepository.findOneBy({ id });
  }

  async updateUom(
    id: string,
    uomUpdateRequestDto: UomUpdateRequestDto,
  ): Promise<Uom> {
    // get the entity
    const uom = await this.uomRepository.findOneBy({ id });
    uom.name = uomUpdateRequestDto.name;
    return this.uomRepository.save(uom);
  }

  async deleteUom(id: string): Promise<Uom> {
    return this.uomRepository.remove(
      await this.uomRepository.findOneBy({ id }),
    );
  }
}
