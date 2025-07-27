import { Rule, RuleType } from '@midwayjs/validate';

export class AddOrgDto {
  @Rule(RuleType.string().required().max(50).message('组织名称不能为空'))
  name: string;

  @Rule(RuleType.string().required().message('组织类型不能为空'))
  orgTypeCode: string;

  @Rule(RuleType.number().required().message('租户不能为空'))
  tenantId: number;

  @Rule(RuleType.number().integer().allow(null))
  superiorId?: number;

  @Rule(RuleType.number().integer().allow(null))
  leaderId?: number;

  @Rule(RuleType.boolean().default(true))
  status?: boolean;

  @Rule(RuleType.number().integer().required())
  createBy: number;
}
