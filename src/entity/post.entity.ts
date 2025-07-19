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
  name: 'post',
  comment: '岗位',
})
export class Post {
  @PrimaryColumn({
    comment: '岗位编码',
    length: 10,
  })
  code: string;

  @ManyToOne(() => Tenant)
  @JoinColumn({
    name: 'tenant_id',
  })
  tenant: Tenant;

  @Column({
    comment: '岗位名称',
    length: 50,
    nullable: false,
  })
  name: string;

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @Column({
    comment: '创建人',
  })
  createBy: number;
}
