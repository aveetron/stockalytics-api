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
  @JoinColumn({ name: 'vendor_id' })
  vendor: Vendor;

  @Column({ default: false })
  isPaid: boolean;

  @Column({ default: false })
  isQcPassed: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(
    () => PurchaseDetail,
    (purchaseDetail) => purchaseDetail.purchase,
    { cascade: true, onDelete: 'CASCADE' },
  )
  details: PurchaseDetail[];
}

@Entity('purchase_detail')
export class PurchaseDetail {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Item)
  @JoinColumn({ name: 'item_id' })
  item: Item;

  @Column('int', { default: 0 })
  qty: number;

  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  unitPrice: number;

  @ManyToOne(() => Purchase, (purchase) => purchase.details)
  @JoinColumn({ name: 'purchase_id' })
  purchase: Purchase;
}
