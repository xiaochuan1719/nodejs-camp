/**
 * express 中间件开发和使用
 */

const app = require('express')();

const PORT = 3050;

// 依次执行的，所以这段代码拦截了 http://127.0.0.1:3050/middle/test01?token=1231313123123123 的请求
app.use('/', (req, res, next) => {
    console.log(`Middleware Test`);

    // add
    let { token } = req.query;
    if (token) {
        res.send('token验证成功，继续执行');
        next(); // 继续执行下一步
    } else {
        res.send('token失效或已过期');
    }

    // 是否继续往下执行
    // next();
});

/// 如果当前模块在根目录下，path 参数可以省略
// app.use((req, res, next) => {
//     console.log(`Middleware Test`);
//     let { token } = req.query;
//     if (token) {
//         res.send('token验证成功，继续执行');
//         next()
//     } else {
//         res.send('token失效或已过期');
//     }
// });

app.get('/middle/test01', (req, res) => {
    console.log('test01');
    // let { token } = req.query;
    // if (token) {
    //     res.send('ok');
    // } else {
    //     res.send('not ok');
    // }
});

app.get('./middle/test02', (req, res) => {
    console.log('test02');
    // let { token } = req.query;
    // if (token) {
    //     res.send('ok');
    // } else {
    //     res.send('not ok');
    // }
});


app.listen(PORT, () => {
    console.log(`Server start`);
});