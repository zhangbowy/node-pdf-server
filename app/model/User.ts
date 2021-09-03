module.exports = app => {
  const { STRING } = app.Sequelize as any;
  const User = app.model.define('user', {
    name: STRING
  });
  return User;
};