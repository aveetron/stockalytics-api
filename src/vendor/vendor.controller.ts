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
import { VendorService } from './vendor.service';
import { VendorCreateRequestDto } from './dto/request.dto';
import { Vendor } from './respository/vendor.entity';

@Controller('vendor')
export class VendorController {
  constructor(private readonly vendorService: VendorService) {}

  @Get('/')
  @HttpCode(200)
  public async getVendors(): Promise<Vendor[]> {
    return this.vendorService.getVendors();
  }

  @Post('/')
  @HttpCode(201)
  public async createVendor(
    @Body() vendorCreateRequestDto: VendorCreateRequestDto,
  ): Promise<Vendor> {
    return this.vendorService.createVendor(vendorCreateRequestDto);
  }

  @Get('/:id')
  @HttpCode(200)
  public async getVendor(@Param('id') id: string): Promise<Vendor> {
    return this.vendorService.getVendor(id);
  }

  @Put('/:id')
  @HttpCode(200)
  public async updateVendor(
    @Param('id') id: string,
    @Body() vendorUpdateRequestDto: VendorCreateRequestDto,
  ): Promise<Vendor> {
    return this.vendorService.updateVendor(id, vendorUpdateRequestDto);
  }

  @Delete('/:id')
  @HttpCode(200)
  public async deleteVendor(@Param('id') id: string): Promise<Vendor> {
    return this.vendorService.deleteVendor(id);
  }
}
