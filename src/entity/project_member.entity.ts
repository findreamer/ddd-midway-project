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
import { Project } from './project.entity';
import { Emp } from './emp.entity';
@Entity({
  name: 'project_member',
  comment: '项目成员表',
})
export class ProjectMember {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Tenant, { nullable: false })
  @JoinColumn({
    name: 'tenant_id',
  })
  tenant: Tenant | null;

  @ManyToOne(() => Project, { nullable: false })
  @JoinColumn({
    name: 'project_id',
  })
  project: Project | null;

  @ManyToOne(() => Emp, { nullable: false })
  @JoinColumn({
    name: 'emp_id',
  })
  emp: Emp | null;

  @Column({
    name: 'estimate_invest_ratio',
    comment: '预估投资比例',
    type: 'smallint',
    nullable: false,
  })
  estimateInverstRatio: number;

  @Column({
    name: 'start_at',
    comment: '项目开始时间',
    type: 'date',
    nullable: false,
  })
  startAt: Date;

  @Column({
    name: 'end_at',
    comment: '项目结束时间',
    type: 'date',
    nullable: false,
  })
  endAt: Date;

  @Column({
    length: 2,
    nullable: false,
  })
  status: string;

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updateAt: Date;
}
