import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { PurchaseService } from './purchase.service';
import { Purchase } from './repository/purchase.entity';
import { PurchaseResponseDto } from './dto/response.dto';
import { CreatePurchaseDTO } from './dto/request.dto';

@Controller('purchase')
export class PurchaseController {
  constructor(private readonly purchaseService: PurchaseService) {}

  @Get('/')
  @HttpCode(200)
  public async getPurchases(): Promise<Purchase[]> {
    return this.purchaseService.getPurchases();
  }

  @Post('/')
  @HttpCode(201)
  public async createPurchase(
    @Body() createPurchaseDTO: CreatePurchaseDTO,
  ): Promise<PurchaseResponseDto> {
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
}
