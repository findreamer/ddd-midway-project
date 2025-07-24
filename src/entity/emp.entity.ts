import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Tenant } from './tenant.entity';
import { Org } from './org.entity';

@Entity({
  name: 'emp',
  comment: '员工',
})
export class Emp {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Tenant)
  @JoinColumn({
    name: 'tenant_id',
  })
  tenant: Tenant;

  @ManyToOne(() => Org)
  @JoinColumn({
    name: 'org_id',
  })
  org: Org;

  @Column({
    length: 20,
    comment: '员工编号',
    nullable: false,
  })
  num: string;

  @Column({
    length: 20,
    comment: '员工身份证号',
    nullable: false,
    name: 'id_num',
  })
  idNum: string;

  @Column({
    length: 20,
    comment: '员工姓名',
    nullable: false,
  })
  name: string;

  @Column({
    length: 2,
    comment: '员工性别',
  })
  gender: string;

  @Column({
    comment: '员工出生日期',
  })
  dob: Date;

  @Column({
    default: true,
  })
  status: boolean;

  @Column({
    comment: '创建时间',
  })
  createAt: Date;

  @Column({
    comment: '更新时间',
  })
  updateAt: Date;

  @Column({
    comment: '创建人',
  })
  createBy: number;
}
