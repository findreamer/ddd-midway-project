import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Tenant } from './tenant.entity';
import { Contract } from './contract.entity';
import { Emp } from './emp.entity';

@Entity({
  name: 'project',
  comment: '项目',
})
export class Project {
  @PrimaryGeneratedColumn()
  id: number;
  @ManyToOne(() => Tenant)
  @JoinColumn({
    name: 'tenant_id',
  })
  tenant: Tenant;

  @ManyToOne(() => Contract)
  @JoinColumn({
    name: 'contract_id',
  })
  contract: Contract;

  @ManyToOne(() => Emp)
  @JoinColumn({
    name: 'emp_id',
  })
  emp: Emp;
}
