
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export const TABLE_sales = 'sales';
@Entity({ name: TABLE_sales })
export class Sales {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int')
  productId: number;

  @Column('int')
  price: number;
  
  @Column('int')
  quantity: number;
  
  @Column('bigint')
  invoiceNumber: number;
  
  @Column('int')
  discount: number;

  @Column('bigint')
  createdDate: number;

  @Column('int')
  createdBy: number;

}

