import { Purchase, PurchaseDetail } from '../repository/purchase.entity';

export class PurchaseResponseDto {
  id: string;
  isPaid: boolean;
  isQcPassed: boolean;
  vendor: string;
  createdAt: Date;
  details: PurchaseDetail[];

  static fromEntity(purchase: Purchase): PurchaseResponseDto {
    return {
      id: purchase.id,
      isPaid: purchase.isPaid,
      isQcPassed: purchase.isQcPassed,
      vendor: purchase.vendor?.name || null,
      createdAt: purchase.createdAt,
      details: purchase.details,
    };
  }
}
