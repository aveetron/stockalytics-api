import { Category } from 'src/category/repository/category.entity';
import { PurchaseDetail } from 'src/purchase/repository/purchase.entity';
// import { Stock } from 'src/stock/repository/stock.entity';
import { Uom } from 'src/uom/repository/uom.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  // OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('item')
export class Item {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @ManyToOne(() => Category)
  @JoinColumn({ name: 'category' })
  category: Category;

  @ManyToOne(() => Uom, (uom) => uom.items)
  @JoinColumn({ name: 'uom' })
  uom: Uom;

  // @OneToOne(() => Stock, (stock) => stock.item)
  // stock: Stock;

  // add purchase details relation
  @OneToMany(() => PurchaseDetail, (purchaseDetail) => purchaseDetail.item)
  purchaseDetails: PurchaseDetail[];
}
