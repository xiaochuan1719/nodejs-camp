const express = require('express');

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

// 登录接口
app.get('/user/login', (req, res) => {
    // 接受 get 请求参数： request.query
    console.log(req.query);

    let { username, password } = req.query;

    if (username === 'loonger' && password === '123456') {
        res.send({ err: 0, msg: 'login ok' });
    } else {
        res.send({ err: -1, msg: 'username and password not ok' });
    }
})

app.post('/user/regist', (req, res) => {
    // 接受 post 请求数据：消息体、请求体
    console.log(req.body);
    // Prints： undefined

    let { username, password } = req.body; 

    /// 知识点：express 不能直接解析消息体
    /// 需要通过第三方的插件 body-parser 实现解析；但是 express 4.16.0 及以上版本
    /// 已经内置相关中间件，直接使用即可

    if (username === 'loonger' && password === '123456') {
        res.send(`Input OK!`);
    } else {
        res.send('Input Error!');
    }
})

app.listen(PORT, () => console.log(`Server start on port ${PORT}!`));

