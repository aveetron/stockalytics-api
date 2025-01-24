import { Injectable } from '@nestjs/common';
import { Purchase, PurchaseDetail } from './repository/purchase.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePurchaseDTO } from './dto/request.dto';
import { PurchaseResponseDto } from './dto/response.dto';
import { Vendor } from 'src/vendor/respository/vendor.entity';

@Injectable()
export class PurchaseService {
  constructor(
    @InjectRepository(Purchase)
    private readonly purchaseRepository: Repository<Purchase>,
    @InjectRepository(PurchaseDetail)
    private readonly purchaseDetailRepository: Repository<PurchaseDetail>,
    @InjectRepository(Vendor)
    private readonly vendorRepository: Repository<Vendor>,
  ) {}

  async getPurchases(): Promise<Purchase[]> {
    return this.purchaseRepository.find();
  }

  async createPurchase(
    createPurchaseDTO: CreatePurchaseDTO,
  ): Promise<PurchaseResponseDto> {
    const vendor = await this.vendorRepository.findOneBy({
      id: createPurchaseDTO.vendorId,
    });

    const purchase = await this.purchaseRepository.save({
      vendor,
      isPaid: createPurchaseDTO.isPaid,
    });

    await this.purchaseDetailRepository.save(
      createPurchaseDTO.details.map((detail) => ({
        item: { id: detail.itemId },
        purchase,
        qty: detail.qty,
        unitPrice: detail.unitPrice,
      })),
    );

    // Reload purchase with details
    const fullPurchase = await this.purchaseRepository.findOne({
      where: { id: purchase.id },
      relations: ['details', 'details.item', 'vendor'],
    });

    return PurchaseResponseDto.fromEntity(fullPurchase);
  }

  async getPurchase(id: string): Promise<PurchaseResponseDto> {
    const purchase = await this.purchaseRepository.findOne({
      where: { id },
      relations: ['details', 'details.item', 'vendor'],
    });
    return PurchaseResponseDto.fromEntity(purchase);
  }

  async payBill(id: string): Promise<PurchaseResponseDto> {
    const purchase = await this.purchaseRepository.findOneBy({ id });
    purchase.isPaid = true;
    await this.purchaseRepository.save(purchase);
    return PurchaseResponseDto.fromEntity(purchase);
  }
}
