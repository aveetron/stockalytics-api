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
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @ManyToOne(() => Uom)
  @JoinColumn({ name: 'uom_id' })
  uom: Uom;
}
