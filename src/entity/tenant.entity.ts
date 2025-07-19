import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@midwayjs/swagger';

@Entity({
  name: 'tenant',
  comment: '租户',
})
export class Tenant {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 50,
    comment: '租户名称',
    nullable: false,
  })
  name: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({
    comment: '创建人',
  })
  @ApiProperty({
    description: '创建人',
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
