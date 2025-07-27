import { Body, Controller, Post, Inject } from '@midwayjs/core';
import { AddOrgDto } from '../dto/org.dto';
import { Context } from '@midwayjs/koa';
import { OrgService } from '../service/org.service';

@Controller('/org')
export class OrgController {
  @Inject()
  ctx: Context;

  @Inject()
  orgService: OrgService;

  @Post('/add')
  async addOrg(@Body() addOrgDto: AddOrgDto) {
    const userId = this.ctx.user.userId;
    return this.orgService.addOrg(addOrgDto, userId);
  }
}
