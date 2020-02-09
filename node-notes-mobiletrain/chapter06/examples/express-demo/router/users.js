const express = require('express');

// 获取路由的实例
const router = express.Router(); 


router.get('/login', (req, res) => {
    // 接受 get 请求参数： request.query
    console.log(req.query);

    let { username, password } = req.query;
    if (username === 'loonger' && password === '123456') {
        res.send({ err: 0, msg: 'login ok' });
    } else {
        res.send({ err: -1, msg: 'username and password not ok' });
    }
});

router.post('/regist', (req, res) => {
    let { username, password } = req.body; 
    if (username === 'loonger' && password === '123456') {
        res.send(`Input OK!`);
    } else {
        res.send('Input Error!');
    }
});

module.exports = router;