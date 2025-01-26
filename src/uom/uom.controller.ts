import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { UomService } from './uom.service';
import {
  UomCreateRequestDto,
  UomRequestDto,
  UomUpdateRequestDto,
} from './dto/request.dto';
import { UomListResponseDto, UomResponseDto } from './dto/response.dto';

@Controller('uom')
export class UomController {
  constructor(private readonly uomService: UomService) {}

  @Get('/')
  @HttpCode(200)
  public async getUoms(
    @Query() uomRequestDto: UomRequestDto,
    @Query('name') name?: string,
  ): Promise<UomListResponseDto> {
    return this.uomService.getUoms(uomRequestDto, name);
  }

  @Post('/')
  @HttpCode(201)
  public async createUom(@Body() uomCreateRequestDto: UomCreateRequestDto) {
    return this.uomService.createUom(uomCreateRequestDto);
  }

  @Get('/:id')
  @HttpCode(200)
  public async getUom(@Param('id') id: string): Promise<UomResponseDto> {
    return this.uomService.getUom(id);
  }

  @Patch('/:id')
  @HttpCode(200)
  public async updateUom(
    @Param('id') id: string,
    @Body() uomUpdateRequestDto: UomUpdateRequestDto,
  ): Promise<UomResponseDto> {
    return this.uomService.updateUom(id, uomUpdateRequestDto);
  }

  @Delete('/:id')
  @HttpCode(200)
  public async deleteUom(@Param('id') id: string): Promise<void> {
    this.uomService.deleteUom(id);
  }
}
