import { MidwayConfig } from '@midwayjs/core';

export default {
  // use for cookie sign key, should change to your own and keep security
  keys: '1752906075859_375',
  koa: {
    port: 7001,
  },
  typeorm: {
    dataSource: {
      default: {
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: 'your_password',
        database: 'enterprise_management',
        entities: ['**/*.entity{.ts,.js}'],
        synchronize: true,
        logging: true,
        poolSize: 10,
        connectorPackage: 'mysql2',
      },
    },
  },
  swagger: {
    title: '企业管理系统',
    version: '1.0',
    description: '企业管理系统',
  },
  jwt: {
    secret: 'zvcmxjsiwu!23W1208x',
    expiresIn: '2d',
  },
} as MidwayConfig;
