import { Purchase } from '../repository/purchase.entity';

export class PurchaseResponseDto {
  id: string;
  total: number;
  vendor: string;
  createdAt: Date;

  static fromEntity(purchase: Purchase): PurchaseResponseDto {
    return {
      id: purchase.id,
      total: purchase.total,
      vendor: purchase.vendor.name,
      createdAt: purchase.createdAt,
    };
  }
}
