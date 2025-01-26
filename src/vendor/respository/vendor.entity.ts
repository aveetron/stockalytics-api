import { Purchase } from 'src/purchase/repository/purchase.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('vendor')
export class Vendor {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  phone: string;

  @Column({ nullable: true })
  address: string;

  @OneToMany(() => Purchase, (purchase) => purchase.vendor)
  purchases: Purchase[];
}
