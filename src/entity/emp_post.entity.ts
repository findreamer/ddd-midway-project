import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Tenant } from './tenant.entity';

@Entity({
  name: 'emp_post',
  comment: '员工_岗位关联表',
})
export class EmpPost {
  @PrimaryColumn({
    comment: '员工id',
    name: 'emp_id',
  })
  empId: number;

  @PrimaryColumn({
    comment: '岗位编码',
    length: 10,
    name: 'post_code',
  })
  postCode: string;

  @ManyToOne(() => Tenant)
  @JoinColumn({
    name: 'tenant_id',
  })
  tenant: Tenant;

  @CreateDateColumn({
    comment: '创建时间',
    name: 'create_at',
  })
  createAt: Date;

  @UpdateDateColumn({
    comment: '更新时间',
    name: 'update_at',
  })
  updateAt: Date;

  @Column({
    comment: '创建人',
    name: 'create_by',
  })
  createBy: number;
}
