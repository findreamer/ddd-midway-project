import { Configuration, App } from '@midwayjs/core';
import { join } from 'path';
import { ReportMiddleware } from './middleware/report.middleware';
import { JwtPassportMiddleware } from './middleware/jwt.middleware';
import * as koa from '@midwayjs/koa';
import * as validate from '@midwayjs/validate';
import * as info from '@midwayjs/info';
import * as swagger from '@midwayjs/swagger';
import * as orm from '@midwayjs/typeorm';
import * as passport from '@midwayjs/passport';
import * as jwt from '@midwayjs/jwt';

@Configuration({
  imports: [
    koa,
    validate,
    orm,
    passport,
    jwt,
    {
      component: info,
      enabledEnvironment: ['local'],
    },
    {
      component: swagger,
      enabledEnvironment: ['local'],
    },
  ],
  importConfigs: [join(__dirname, './config')],
})
export class MainConfiguration {
  @App('koa')
  app: koa.Application;

  async onReady() {
    // add middleware
    this.app.useMiddleware([ReportMiddleware, JwtPassportMiddleware]);
    // add filter
    // this.app.useFilter([NotFoundFilter, DefaultErrorFilter]);
  }
}
