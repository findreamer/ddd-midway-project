import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Tenant } from './tenant.entity';
import { ApiProperty } from '@midwayjs/swagger';
import { OrgType } from './org_type.entity';
import { Emp } from './emp.entity';

@Entity({
  name: 'org',
  comment: '组织',
})
export class Org {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 50,
    comment: '组织名称',
    nullable: false,
  })
  @ApiProperty({
    description: '组织名称',
  })
  name: string;

  @OneToOne(() => OrgType)
  @JoinColumn({
    name: 'org_type_code',
    referencedColumnName: 'code',
    foreignKeyConstraintName: 'fk',
  })
  orgTypeCode: OrgType;

  @ApiProperty({
    description: '租户',
  })
  @ManyToOne(() => Tenant, { nullable: false })
  @JoinColumn({
    name: 'tenant_id',
  })
  tenant: Tenant;

  @ManyToOne(() => Org)
  @JoinColumn({
    name: 'superior_id',
  })
  superior: Org;

  @OneToOne(() => Emp)
  @JoinColumn({
    name: 'leader_id',
  })
  leader: Emp;

  @Column({
    default: true,
  })
  status: boolean;

  @CreateDateColumn()
  @ApiProperty({
    description: '创建时间',
  })
  createdAt: Date;

  @UpdateDateColumn()
  @ApiProperty({
    description: '更新时间',
  })
  updatedAt: Date;

  @Column({
    comment: '创建人',
  })
  createBy: number;

  @Column({
    comment: '更新人',
  })
  @ApiProperty({
    description: '更新人',
  })
  lastUpdateBy: number;
}
