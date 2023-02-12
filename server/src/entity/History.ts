import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export const TABLE_History = 'history';
@Entity({ name: TABLE_History })
export class History {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int')
  userId: number;

  @Column('text')
  action: string;

  @Column('bigint')
  createdDate: number;

}

