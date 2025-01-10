import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UomService } from './uom.service';
import { UomEntity } from './repository/uom.entity';
import { UomCreateRequestDto, UomUpdateRequestDto } from './dto/request.dto';

@Controller('uom')
export class UomController {
  constructor(private readonly uomService: UomService) {}

  @Get('/')
  @HttpCode(200)
  public async getUoms(): Promise<UomEntity[]> {
    return this.uomService.getUoms();
  }

  @Post('/')
  @HttpCode(201)
  public async createUom(@Body() uomCreateRequestDto: UomCreateRequestDto) {
    return this.uomService.createUom(uomCreateRequestDto);
  }

  @Get('/:id')
  @HttpCode(200)
  public async getUom(@Param('id') id: string): Promise<UomEntity> {
    return this.uomService.getUom(id);
  }

  @Patch('/:id')
  @HttpCode(200)
  public async updateUom(
    @Param('id') id: string,
    @Body() uomUpdateRequestDto: UomUpdateRequestDto,
  ): Promise<UomEntity> {
    return this.uomService.updateUom(id, uomUpdateRequestDto);
  }

  @Delete('/:id')
  @HttpCode(200)
  public async deleteUom(@Param('id') id: string): Promise<UomEntity> {
    return this.uomService.deleteUom(id);
  }
}
