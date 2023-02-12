import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export const TABLE_user = 'user';
@Entity({ name: TABLE_user })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text', { nullable: false })
  firstName: string;

  @Column('text', { nullable: false })
  lastName: string;

  @Column('text')
  address: string;

  @Column('text')
  phone: string;

  @Column('text')
  email: string;

  @Column('boolean')
  emailConfirmed: boolean;

  @Column('text')
  password: string;

  @Column('bigint')
  birthday: number;

  @Column('int', { nullable: true })
  type: number;

  @Column('boolean')
  allowLogin: boolean;

  @Column('boolean')
  isDeleted: boolean;

  @Column('bigint')
  createdDate: number;

}
