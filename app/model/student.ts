// import { Application } from 'egg';
// import student from './../schema/student';
// // 用户表
// export default (app: Application) => {
//   const studentSchema = student(app);
//   // 定义表模型
//   const Student: any = app.model.define('student', studentSchema);

//   // 创建表间关系
//   Student.associate = () => {};

//   Student.get = async ({ id, attributes }) => {
//     return await Student.findOne({
//       attributes,
//       where: { id },
//     });
//   };

//   Student.saveNew = async (student: any) => {
//     const result = await Student.create(student);
//     return result.id;
//   };

//   return Student;
// };
