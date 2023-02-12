import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export const TABLE_invoice = 'invoice';
@Entity({ name: TABLE_invoice })
export class Invoice {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int')
  productId: number;

  @Column('int')
  qty: number;

  @Column('int')
  price: number;

  @Column('int')
  discount: number;

  @Column('int')
  createdDate: string;

  @Column('int')
  createdBy: number;

}


