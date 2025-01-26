// import { Item } from 'src/item/repository/item.entity';
import {
  Column,
  Entity,
  // JoinColumn,
  // OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Stock {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // @OneToOne(() => Item, (item) => item.stock)
  // @JoinColumn({ name: 'itemId' })
  // item: Item;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  qty: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  buyingPrice: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  sellingPrice: number;

  @Column({ type: 'date', nullable: true })
  lastPurchase: Date;
}
