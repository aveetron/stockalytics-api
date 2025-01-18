import { Category } from 'src/category/repository/category.entity';
import { Uom } from 'src/uom/repository/uom.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
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
}
