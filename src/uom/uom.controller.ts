import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UomService } from './uom.service';
import { Uom } from './repository/uom.entity';
import { UomCreateRequestDto, UomUpdateRequestDto } from './dto/request.dto';

@Controller('uom')
export class UomController {
  constructor(private readonly uomService: UomService) {}

  @Get('/')
  @HttpCode(200)
  public async getUoms(): Promise<Uom[]> {
    try {
      return this.uomService.getUoms();
    } catch (error) {
      throw new HttpException(error.message, 400);
    }
  }

  @Post('/')
  @HttpCode(201)
  public async createUom(@Body() uomCreateRequestDto: UomCreateRequestDto) {
    try {
      return this.uomService.createUom(uomCreateRequestDto);
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, 400);
    }
  }

  @Get('/:id')
  @HttpCode(200)
  public async getUom(@Param('id') id: string): Promise<Uom> {
    try {
      return this.uomService.getUom(id);
    } catch (error) {
      throw new HttpException(error.message, 400);
    }
  }

  @Patch('/:id')
  @HttpCode(200)
  public async updateUom(
    @Param('id') id: string,
    @Body() uomUpdateRequestDto: UomUpdateRequestDto,
  ): Promise<Uom> {
    try {
      return this.uomService.updateUom(id, uomUpdateRequestDto);
    } catch (error) {
      throw new HttpException(error.message, 400);
    }
  }

  @Delete('/:id')
  @HttpCode(200)
  public async deleteUom(@Param('id') id: string): Promise<Uom> {
    try {
      return this.uomService.deleteUom(id);
    } catch (error) {
      throw new HttpException(error.message, 400);
    }
  }
}
