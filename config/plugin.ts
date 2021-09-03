'use strict';

import 'tsconfig-paths/register';
import { EggPlugin } from 'egg'

const plugin: EggPlugin = {
  sequelize: {
    enable: true,
    package: 'egg-sequelize'
  },
  redis: {
    enable: true,
    package: 'egg-redis'
  },
  routerPlus: {
    package: 'egg-router-plus',
    enable: true,
  }
}

export default plugin