import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export const TABLE_Category = 'category';
@Entity({ name: TABLE_Category })
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  name: string;

  @Column('text')
  description: string;

  @Column('bigint', { nullable: true })
  createdDate: number;

  @Column('int')
  createdBy: number;

  @Column('boolean')
  isDeleted: boolean;

}

