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

  @Column('decimal', { precision: 10, scale: 2 })
  total: number;

  @ManyToOne(() => Vendor, (vendor) => vendor.purchases)
  @JoinColumn({ name: 'vendorId' })
  vendor: Vendor;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => PurchaseDetail, (purchaseDetail) => purchaseDetail.purchase)
  purchaseDetails: PurchaseDetail[];
}

@Entity('purchase_detail')
export class PurchaseDetail {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Item)
  @JoinColumn({ name: 'id' })
  item: Item;

  @Column()
  itemId: number;

  @Column('int')
  qty: number;

  @Column('decimal', { precision: 10, scale: 2 })
  unitPrice: number;

  @ManyToOne(() => Purchase, (purchase) => purchase.purchaseDetails)
  @JoinColumn({ name: 'purchaseId' })
  purchase: Purchase;
}
