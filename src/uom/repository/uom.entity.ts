import { Item } from 'src/item/repository/item.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Uom {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @OneToMany(() => Item, (item) => item.uom)
  items: Item[];
}
