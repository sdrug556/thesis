import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export const TABLE_supplier = 'supplier';
@Entity({ name: TABLE_supplier })
export class Supplier {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  name: string;

  @Column('text')
  description: string;

  @Column('text')
  contactNumber: string;

  @Column('text', { nullable: true })
  email: string;

  @Column('bigint', { nullable: true })
  createdDate: number;

  @Column('int')
  createdBy: number;

  @Column('boolean')
  isDeleted: boolean;

}


