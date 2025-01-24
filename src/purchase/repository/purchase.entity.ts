import { Item } from 'src/item/repository/item.entity';
import { Vendor } from 'src/vendor/respository/vendor.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('purchase')
export class Purchase {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Vendor, (vendor) => vendor.purchases)
  @JoinColumn({ name: 'vendorId' })
  vendor: Vendor;

  @Column({ default: false })
  isPaid: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => PurchaseDetail, (purchaseDetail) => purchaseDetail.purchase)
  details: PurchaseDetail[];
}

@Entity('purchase_detail')
export class PurchaseDetail {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Item)
  @JoinColumn({ name: 'itemId' })
  item: Item;

  @Column('int')
  qty: number;

  @Column('decimal', { precision: 10, scale: 2 })
  unitPrice: number;

  @ManyToOne(() => Purchase, (purchase) => purchase.details)
  @JoinColumn({ name: 'purchaseId' })
  purchase: Purchase;
}
