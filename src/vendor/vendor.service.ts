import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Vendor } from './respository/vendor.entity';
import { Repository } from 'typeorm';
import { VendorCreateRequestDto } from './dto/request.dto';

@Injectable()
export class VendorService {
  constructor(
    @InjectRepository(Vendor)
    private readonly vendorRepository: Repository<Vendor>,
  ) {}

  async getVendors(): Promise<Vendor[]> {
    return this.vendorRepository.find();
  }

  async createVendor(
    vendorCreateRequestDto: VendorCreateRequestDto,
  ): Promise<Vendor> {
    return this.vendorRepository.save(vendorCreateRequestDto);
  }

  async getVendor(id: string): Promise<Vendor> {
    return this.vendorRepository.findOneBy({ id });
  }

  async updateVendor(
    id: string,
    vendorUpdateRequestDto: VendorCreateRequestDto,
  ): Promise<Vendor> {
    // get the entity
    const vendor = await this.vendorRepository.findOneBy({ id });
    vendor.name = vendorUpdateRequestDto.name;
    vendor.phone = vendorUpdateRequestDto.phone;
    vendor.address = vendorUpdateRequestDto.address;
    return this.vendorRepository.save(vendor);
  }

  async deleteVendor(id: string): Promise<Vendor> {
    return this.vendorRepository.remove(
      await this.vendorRepository.findOneBy({ id }),
    );
  }
}
