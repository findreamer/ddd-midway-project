import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Tenant } from './tenant.entity';
import { Emp } from './emp.entity';

@Entity({
  comment: '客户表',
  name: 'client',
})
export class Client {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Tenant)
  @JoinColumn({
    name: 'tenant_id',
  })
  tenant: Tenant;

  @ManyToOne(() => Emp)
  @JoinColumn({
    name: 'mng_id',
  })
  mng: Emp;

  @Column({
    length: 50,
    nullable: false,
    comment: '客户名称',
  })
  name: string;

  @CreateDateColumn({
    comment: '创建时间',
  })
  createAt: Date;

  @UpdateDateColumn({
    comment: '更新时间',
  })
  updateAt: Date;

  @Column({
    comment: '创建人',
  })
  createBy: number;
}
