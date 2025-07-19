import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ApiProperty } from '@midwayjs/swagger';
import { Tenant } from './tenant.entity';

@Entity({
  name: 'org_type',
  comment: '组织类型',
})
export class OrgType {
  @PrimaryColumn({
    length: 10,
    comment: '组织类型编码',
  })
  code: string;

  @ManyToOne(() => Tenant, { nullable: false })
  @JoinColumn({
    name: 'tenant_id',
  })
  tenant: Tenant;

  @Column({
    length: 50,
    comment: '组织类型名称',
    nullable: false,
  })
  @ApiProperty({
    description: '组织类型名称',
  })
  name: string;

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
    comment: '更新人',
  })
  @ApiProperty({
    description: '更新人',
  })
  lastUpdateBy: number;
}
