import { Provide } from '@midwayjs/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Org } from '../entity/org.entity';
import { Repository } from 'typeorm';
import { AddOrgDto } from '../dto/org.dto';
import { Tenant } from '../entity/tenant.entity';
import { OrgType } from '../entity/org_type.entity';
import { Emp } from '../entity/emp.entity';

@Provide()
export class OrgService {
  @InjectEntityModel(Org)
  orgRepository: Repository<Org>;

  @InjectEntityModel(Tenant)
  tenantRepository: Repository<Tenant>;

  @InjectEntityModel(OrgType)
  orgTypeRepository: Repository<OrgType>;

  @InjectEntityModel(Emp)
  empRepository: Repository<Emp>;

  async addOrg(orgDto: AddOrgDto, userId: number) {
    await this.validate(orgDto);
    let org = await this.buildOrg(orgDto, userId);
    org = await this.orgRepository.save(org);
    return org;
  }

  async buildOrg(orgDto: AddOrgDto, userId: number): Promise<Org> {
    const { name, orgTypeCode, tenantId, superiorId, leaderId } = orgDto;

    const org = new Org();
    if (tenantId) {
      const tenant = await this.tenantRepository.findOne({
        where: {
          id: tenantId,
        },
      });
      org.tenant = tenant;
    }
    if (superiorId) {
      const superior = await this.orgRepository.findOne({
        where: {
          id: superiorId,
        },
      });
      org.superior = superior;
    }
    if (leaderId) {
      const leader = await this.empRepository.findOne({
        where: {
          id: leaderId,
        },
      });
      org.leader = leader;
    }

    if (orgTypeCode) {
      const orgType = await this.orgTypeRepository.findOne({
        where: {
          code: orgTypeCode,
        },
      });
      org.orgTypeCode = orgType;
    }
    org.name = name;
    org.status = true;
    org.createBy = userId;
    org.createdAt = new Date();
    return org;
  }

  async validate(orgDto: AddOrgDto) {
    const { tenantId, leaderId, orgTypeCode, superiorId, name } = orgDto;
    await this.tenantShouldValid(tenantId);
    await this.leaderShouldBeEffective(tenantId, leaderId);
    await this.verifyOrgType(tenantId, orgTypeCode);
    await this.validateSuperior(tenantId, superiorId, orgTypeCode);
    await this.verifyOrgName(tenantId, name, superiorId);
  }

  /**
   * 租户必须有效
   * @param tenantId
   */
  async tenantShouldValid(tenantId: number) {
    const tenant = await this.tenantRepository.findOne({
      where: {
        id: tenantId,
      },
      select: ['status'],
    });

    if (!tenant.status) {
      throw new Error('租户不存在');
    }
  }

  /**
   * 组织负责人可以空缺，如果有的话，必须是一个在职员工（含试用期）
   */
  async leaderShouldBeEffective(tenantId: number, leaderId: number) {
    if (leaderId) {
      const leader = await this.empRepository.findOne({
        where: {
          tenant: {
            id: tenantId,
          },
          id: leaderId,
        },
        select: ['id', 'status'],
      });
      if (!leader.status) {
        throw new Error('组织负责人不存在');
      }
    }
  }

  /**
   * 组织类别必须有效
   * @param tenantId
   * @param orgTypeCode
   */
  async verifyOrgType(tenantId: number, orgTypeCode: string) {
    // 组织类别不能为空
    if (!orgTypeCode) {
      throw new Error('组织类别不能为空');
    }

    // 组织类别必须有效
    const orgType = await this.orgTypeRepository.findOne({
      where: {
        tenant: {
          id: tenantId,
        },
        code: orgTypeCode,
      },
      select: ['code'],
    });
    if (!orgType) {
      throw new Error(`${orgTypeCode}组织类别不存在`);
    }
  }

  async validateSuperior(
    tenantId: number,
    superiorId: number,
    orgTypeCode: string
  ) {
    // 如果参数里面传递了上级组织，则检验上级组织是否为有效组织
    if (superiorId) {
      const superior = await this.orgRepository.findOne({
        where: {
          tenant: {
            id: tenantId,
          },
          id: superiorId,
        },
        select: ['id', 'orgTypeCode'],
      });
      if (!superior) {
        throw new Error(`${superiorId}上级组织不存在`);
      }
      // 开发组的上级只能是开发中心
      if (orgTypeCode === 'DEVGRP' && superior.orgTypeCode.code !== 'DEVCENT') {
        throw new Error('开发组的上级只能是开发中心');
      }

      // 开发中心和直属部门的上级只能是企业
      if (
        (orgTypeCode === 'DEVCENT' || orgTypeCode === 'DIRDEP') &&
        superior.orgTypeCode.code !== 'ENTP'
      ) {
        throw new Error('开发中心和直属部门的上级不是企业');
      }
    }
  }

  async verifyOrgName(tenantId: number, name: string, superiorId?: number) {
    // 组织名称不能为空
    if (!name) {
      throw new Error('组织名称不能为空');
    }

    // 同一个组织下的下级组织不能重名
    const org = await this.orgRepository.findOne({
      where: {
        name: name,
        tenant: {
          id: tenantId,
        },
        superior: superiorId
          ? {
              id: superiorId,
            }
          : null,
      },
    });
    if (org) {
      throw new Error('组织名称重复');
    }
  }
}
