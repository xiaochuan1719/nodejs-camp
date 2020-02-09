const express = require('express');

const userRouter = require('./router/users');

// express 实例化
const app = express();

/// 知识点： Express v4.16.0及更高版本中提供了此中间件： express.json() 和 express.urlencoded()
/// 其他版本需要引入 body-parser 模块；上述的中间件也是基于 body-parser 的
// for parsing application/json JSON
app.use(express.json());
// for parsing application/x-www-form-urlencoded 表单
app.use(express.urlencoded({ extended: true }));

const PORT = 3050;

// 设置跨域访问 CORS
app.all('*', (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    // res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

// 使用路由
app.use('/user', userRouter);

app.listen(PORT, () => console.log(`Server start on port ${PORT}!`));

