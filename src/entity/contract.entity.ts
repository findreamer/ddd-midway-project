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
import { Client } from './client.entity';
import { Emp } from './emp.entity';

export enum ContractStatus {
  DRAFT = 'draft',
  SIGNED = 'signed',
  CANCELLED = 'cancelled',
}

@Entity({
  comment: '合同表',
  name: 'contract',
})
export class Contract {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Tenant)
  @JoinColumn({
    name: 'tenant_id',
  })
  tenant: Tenant;

  @ManyToOne(() => Client)
  @JoinColumn({
    name: 'client_id',
  })
  client: Client;

  @ManyToOne(() => Emp)
  @JoinColumn({
    name: 'mng_id',
  })
  mng: Emp;

  @Column({
    comment: '合同编号',
    length: 20,
    nullable: false,
  })
  num: string;

  @Column({
    comment: '合同名称',
    length: 50,
    nullable: false,
  })
  name: string;

  @Column({
    comment: '合同状态',
    nullable: false,
    enum: ContractStatus,
    default: ContractStatus.DRAFT,
    type: 'enum',
  })
  status: ContractStatus;

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @Column({
    comment: '创建人',
  })
  createBy: number;
}
