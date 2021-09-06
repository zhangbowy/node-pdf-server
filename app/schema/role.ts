import { Application } from 'egg';

export default (app: Application) => {
  const { Sequelize } = app;

  return {
    id: {
        type: Sequelize.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        comment: '主键id',
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: '角色名称',
      },
      desc: {
        type: Sequelize.STRING,
        comment: '角色描述',
      },
      permission: {
        type: Sequelize.TEXT,
        comment: '权限id列表',
      }
  };
};
