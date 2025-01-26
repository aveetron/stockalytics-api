import { Injectable, NotFoundException } from '@nestjs/common';
import { Purchase, PurchaseDetail } from './repository/purchase.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CreatePurchaseDTO } from './dto/request.dto';
import { PurchaseResponseDto } from './dto/response.dto';
import { Vendor } from 'src/vendor/respository/vendor.entity';
import { Item } from 'src/item/repository/item.entity';

@Injectable()
export class PurchaseService {
  constructor(
    @InjectRepository(Purchase)
    private readonly purchaseRepository: Repository<Purchase>,
    @InjectRepository(PurchaseDetail)
    private readonly purchaseDetailRepository: Repository<PurchaseDetail>,
    @InjectRepository(Vendor)
    private readonly vendorRepository: Repository<Vendor>,
    @InjectRepository(Item)
    private readonly itemRepository: Repository<Item>,
  ) {}

  async getPurchases(): Promise<PurchaseResponseDto[]> {
    const purchases = await this.purchaseRepository.find({
      relations: ['details', 'details.item', 'vendor'],
    });
    return purchases.map((purchase) =>
      PurchaseResponseDto.fromEntity(purchase),
    );
  }

  async createPurchase(
    createPurchaseDTO: CreatePurchaseDTO,
  ): Promise<PurchaseResponseDto> {
    try {
      const vendor = await this.vendorRepository.findOneBy({
        id: createPurchaseDTO.vendorId,
      });
      if (!vendor) {
        throw new NotFoundException(
          `Vendor with ID ${createPurchaseDTO.vendorId} not found`,
        );
      }

      // create the purchase
      const purchase = await this.purchaseRepository.save({
        vendor,
        isPaid: createPurchaseDTO.isPaid,
        isQcPassed: createPurchaseDTO.isQcPassed,
      });

      const items = await this.itemRepository.findBy({
        id: In(createPurchaseDTO.details.map((detail) => detail.itemId)),
      });
      const itemMap = new Map(items.map((item) => [item.id, item]));

      createPurchaseDTO.details.forEach((detail) => {
        if (!itemMap.has(detail.itemId)) {
          throw new NotFoundException(
            `Item with ID ${detail.itemId} not found`,
          );
        }
      });

      await this.purchaseDetailRepository.save(
        createPurchaseDTO.details.map((detail) => ({
          item: itemMap.get(detail.itemId),
          purchase,
          qty: detail.qty,
          unitPrice: detail.unitPrice,
        })),
      );

      const fullPurchase = await this.purchaseRepository.findOne({
        where: { id: purchase.id },
        relations: ['details', 'details.item', 'vendor'],
      });

      return PurchaseResponseDto.fromEntity(fullPurchase);
    } catch (error) {
      console.error('Purchase creation error:', error);
      throw error;
    }
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

  async deletePurchase(id: string): Promise<void> {
    await this.purchaseDetailRepository.delete({ purchase: { id } });
    await this.purchaseRepository.delete({ id });
  }
}
