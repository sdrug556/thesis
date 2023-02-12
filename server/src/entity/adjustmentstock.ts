import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from './Product';

export const TABLE_AdjustmentStock = 'adjustment-stock';
@Entity({ name: TABLE_AdjustmentStock })
export class AdjustmentStock {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int')
  stock: number;

  @Column('bigint', { nullable: true })
  createdDate: number;

  @Column('int')
  productId: number;
  
  @Column('int')
  userId: number;

  fullName: string;

}


