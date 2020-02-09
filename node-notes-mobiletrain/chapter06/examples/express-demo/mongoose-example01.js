const mongoose = require("mongoose");

const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true
};

// 创建数据库连接
mongoose.connect("mongodb://localhost/db2020", options);

// 连接到数据库
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  // Connected!
  console.log(`connection success!`);
});

// (node:11668) DeprecationWarning: current URL string parser is deprecated,
// and will be removed in a future version. To use the new parser,
// pass option { useNewUrlParser: true } to MongoClient.connect.
// connection success!

// (node:4012) DeprecationWarning: current Server Discovery and Monitoring engine is deprecated,
// and will be removed in a future version. To use the new Server Discover and Monitoring engine,
// pass option { useUnifiedTopology: true } to the MongoClient constructor.
// connection success!

/// 在 Mongooe 里，一切都源于 Schema
/// With Mongoose, everything is derived from a Schema.
// 创建一个和集合相关的 Schema 对象，类似表头
// const Schema = mongoose.Schema;
// const userSchema = new Schema({
//     // ...
// });
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    require: true
  },
  age: Number,
  sex: {
    type: Number,
    default: 0
  }
});

/// 将 schema 对象转换成模型Model
// 该数据对象和集合关联 ('集合名'， Schema对象)
const User = mongoose.model("User", userSchema);

/// 插入数据
// User.insertMany([{
//     username: 'loonger',
//     password: '123456',
//     age: 18
// }, {
//     username: 'y2k0',
//     password: '888888',
//     age: 20
// }]).then((data) => {
//     console.log(data);
//     console.log(`插入成功`);
// }).catch((err) => {
//     console.log(`插入失败`);
// });

// [
//     {
//       sex: 0,
//       _id: 5e3f89d336ebcb3240456d83,
//       username: 'loonger',
//       password: '123456',
//       age: 18,
//       __v: 0
//     }
// ]

/// 查询数据
// User.find({ username: 'loonger' }).then((data) => {
//     console.log(data);
//     console.log(`查询成功`);
// }).catch((err) => {
//     console.log(`查询失败`);
// });

// [
//     {
//       sex: 0,
//       _id: 5e3f89d336ebcb3240456d83,
//       username: 'loonger',
//       password: '123456',
//       age: 18,
//       __v: 0
//     }
// ]
// 查询成功

/// 删除数据
// User.remove().then((data) => {
//     console.log(data);
//     console.log(`删除成功`);
// }).catch((err) => {
//     console.log(`删除失败`);
// });

/// 更新数据
// User.update({ username: "loonger" }, { $set: { age: 17 } })
//   .then(data => {
//       console.log(`更新成功`);
//   })
//   .catch(err => {
//     console.log(`更新失败`);
//   });

// (node:13816) DeprecationWarning: collection.update is deprecated. 
// Use updateOne, updateMany, or bulkWrite instead.
// 更新成功

User.updateMany({ username: "loonger" }, { $set: { age: 20 } })
  .then(data => {
      console.log(`更新成功`);
  })
  .catch(err => {
    console.log(`更新失败`);
  });