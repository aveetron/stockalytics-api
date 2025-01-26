import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { PurchaseService } from './purchase.service';
import { PurchaseResponseDto } from './dto/response.dto';
import { CreatePurchaseDTO } from './dto/request.dto';

@Controller('purchase')
export class PurchaseController {
  constructor(private readonly purchaseService: PurchaseService) {}

  @Get('/')
  @HttpCode(200)
  public async getPurchases(): Promise<PurchaseResponseDto[]> {
    return this.purchaseService.getPurchases();
  }

  @Post('/')
  @HttpCode(201)
  public async createPurchase(
    @Body() createPurchaseDTO: CreatePurchaseDTO,
  ): Promise<PurchaseResponseDto> {
    // check if vendor id is not empty
    if (!createPurchaseDTO.vendorId) {
      throw new BadRequestException('Vendor ID cannot be empty');
    }

    // check if purchase details is not empty
    if (!createPurchaseDTO.details || createPurchaseDTO.details.length === 0) {
      throw new BadRequestException('Purchase details cannot be empty');
    }

    return this.purchaseService.createPurchase(createPurchaseDTO);
  }

  @Get('/:id')
  @HttpCode(200)
  public async getPurchase(
    @Param('id') id: string,
  ): Promise<PurchaseResponseDto> {
    return this.purchaseService.getPurchase(id);
  }

  @Patch('pay/:id')
  @HttpCode(200)
  public async payBill(@Param('id') id: string): Promise<PurchaseResponseDto> {
    return this.purchaseService.payBill(id);
  }

  @Delete('/:id')
  @HttpCode(200)
  public async deletePurchase(@Param('id') id: string): Promise<void> {
    this.purchaseService.deletePurchase(id);
  }
}
