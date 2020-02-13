const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const app = express();

app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());

/**
 * session 中间件的配置参数：
 * 
 * name: 设置 cookie 中，保存 session 的字段名称，默认为 connect.sid
 * store: session 的存储方式，默认存放在内存中，我们可以自定义为 redis 等
 * genid: 生成一个新的 session_id，默认为使用 uid2 这个 npm 包
 * rolling: 每个请求都重新设置一个 cookie，默认为 false
 * resave: 即使 session 没有被修改，也保存 session 的值，默认为 true
 * saveUninitialized: 强制未初始化的 session 保存到数据库
 * secret: 通过设置的 secret 字符串，来计算 hash 值并放在 cookie 中，使产生的 signedCookie 防篡改
 * cookie: 设置存放 session 的 cookie 的相关选项
 */
const sessionOptions = {
    // 对 session_id 相关的 cookie 进行签名
    secret: 'secret',   
    resave: true,
    // 是否保存未初始化的会话
    saveUninitialized: false,
    cookie: {
        // 设置 session 的有效时间，单位毫秒
        maxAge: 1000 * 60 * 3,
    }
};

app.use(session(sessionOptions));

app.post('/user/login', (req, res) => {
    let { username, password } = req.body;
    if (username === 'loonger' && password === '123456') {
        req.session.username = 'loonger';
        res.cookie('islogin', true, { maxAge: 1000 * 60 * 3 });
        res.send({ err: 0, msg: 'login ok' });
    } else {
        res.send({ err: -1, msg: 'username and password not ok' });
    }
});

app.get('/user/index', (req, res) => {
    console.log(req.session);
});

app.listen(3050, () => {
    console.log(`❤ Listening Ok ❤`);
});