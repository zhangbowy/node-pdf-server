// import { Application } from 'egg';

// export default (app: Application) => {
//   const { Sequelize } = app;
//   return {
//     id: {
//       type: Sequelize.INTEGER().UNSIGNED,
//       primaryKey: true,
//       autoIncrement: true,
//       comment: '主键',
//     },
//     username: {
//       type: Sequelize.STRING(10),
//       allowNull: false,
//       comment: '用户名称',
//     },
//     type: {
//       type: Sequelize.INTEGER().UNSIGNED,
//       allowNull: false,
//       default: 1,
//       comment: '类型:1小学生，2中学生,3高中生',
//     },
//     status: {
//       type: Sequelize.BOOLEAN, // 1返回true，0返回false
//       allowNull: false,
//       default: 1,
//       comment: '状态值:1启用 0 关闭',
//     },
//     createdTime: {
//       type: Sequelize.DATE,
//       allowNull: false,
//     },
//     updateTime: {
//       type: Sequelize.DATE,
//       allowNull: false,
//     },
//   };
// };
