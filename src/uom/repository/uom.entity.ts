import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Uom {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;
}
