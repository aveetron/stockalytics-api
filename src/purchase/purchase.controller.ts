import { Controller, Get, HttpCode } from '@nestjs/common';
import { PurchaseService } from './purchase.service';
import { Purchase } from './repository/purchase.entity';

@Controller('purchase')
export class PurchaseController {
  constructor(private readonly purchaseService: PurchaseService) {}

  @Get()
  @HttpCode(200)
  public async getPurchases(): Promise<Purchase[]> {
    return this.purchaseService.getPurchases();
  }

  // @Post()
  // @HttpCode(201)
  // public async createPurchase(): Promise<PurchaseResponseDto> {
  //   return this.purchaseService.createPurchase();
  // }
}
