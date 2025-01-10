import { Injectable } from '@nestjs/common';
import { UomEntity } from './repository/uom.entity';
import { Repository } from 'typeorm';
import { UomCreateRequestDto, UomUpdateRequestDto } from './dto/request.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UomService {
  constructor(
    @InjectRepository(UomEntity)
    private readonly uomRepository: Repository<UomEntity>,
  ) {}

  async getUoms(): Promise<UomEntity[]> {
    return this.uomRepository.find();
  }

  async createUom(
    uomCreateRequestDto: UomCreateRequestDto,
  ): Promise<UomEntity> {
    return this.uomRepository.save(uomCreateRequestDto);
  }

  async getUom(id: string): Promise<UomEntity> {
    return this.uomRepository.findOneBy({ id });
  }

  async updateUom(
    id: string,
    uomUpdateRequestDto: UomUpdateRequestDto,
  ): Promise<UomEntity> {
    // get the entity
    const uom = await this.uomRepository.findOneBy({ id });
    uom.name = uomUpdateRequestDto.name;
    return this.uomRepository.save(uom);
  }

  async deleteUom(id: string): Promise<UomEntity> {
    return this.uomRepository.remove(
      await this.uomRepository.findOneBy({ id }),
    );
  }
}
