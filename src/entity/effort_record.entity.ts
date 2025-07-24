import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Tenant } from './tenant.entity';
import { Project } from './project.entity';
import { Emp } from './emp.entity';

@Entity({
  name: 'effort_record',
  comment: '工作记录表',
})
export class EffortRecord {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Tenant, { nullable: false })
  @JoinColumn({
    name: 'tenant_id',
  })
  tenant: Tenant;

  @ManyToOne(() => Project, { nullable: false })
  @JoinColumn({
    name: 'project_id',
  })
  project: Project;

  @ManyToOne(() => Emp, { nullable: false })
  @JoinColumn({
    name: 'emp_id',
  })
  emp: Emp;

  @Column({
    name: 'work_date',
    type: 'date',
    nullable: false,
  })
  workDate: Date;

  @Column({
    type: 'decimal',
    precision: 2,
    scale: 1,
    nullable: false,
  })
  effort: number;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
    comment: '备注',
  })
  notes: string;

  @CreateDateColumn({
    name: 'create_at',
    type: 'datetime',
    nullable: false,
    comment: '创建时间',
  })
  createAt: Date;

  @Column({
    name: 'create_by',
    type: 'int',
    nullable: false,
    comment: '创建人',
  })
  createBy: number;

  @UpdateDateColumn({
    name: 'last_update_at',
    type: 'datetime',
    nullable: true,
    comment: '最后更新时间',
  })
  lastUpdateAt: Date;

  @Column({
    name: 'last_update_by',
    type: 'int',
    nullable: true,
    comment: '最后更新人',
  })
  lastUpdateBy: number;
}
