import { Injectable } from '@nestjs/common';
import { Purchase } from './repository/purchase.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PurchaseService {
  constructor(
    @InjectRepository(Purchase)
    private readonly purchaseRepository: Repository<Purchase>,
  ) {}

  async getPurchases(): Promise<Purchase[]> {
    return this.purchaseRepository.find();
  }

  // async createPurchase(): Promise<PurchaseResponseDto> {
  // return this.purchaseRepository.save(purchase);
  // }
}
