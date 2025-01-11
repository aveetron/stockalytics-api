import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('vendor')
export class Vendor {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  phone: string;

  @Column()
  address: string;
}
