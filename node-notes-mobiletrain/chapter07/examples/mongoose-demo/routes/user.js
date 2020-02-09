const router = require('express').Router();
const Users = require('../models/users.model');

/**
 * 用户注册
 */
router.post('/regist', (req, res) => {
    // 获取数据
    const { username, password, email } = req.body;
    if (!username || !password || !email) {
        res.send({ success: false, message: `参数错误` });
    } else {
        Users.find({ username }).then(data => {
            if (!data || data.length === 0) {
                const registUser = new Users({
                    username,
                    password,
                    email
                });

                // 用户名不存在，则注册
                return Users.insertMany(registUser);
                
            } else {
                return res.send({ success: false, message: `用户名已存在` });
            }
        }).then(data => {
            res.send({ success: true, message: `注册成功` });
        }).catch(err => {
            res.send({ success: false, message: `注册失败` });
            if (err) throw err;
        });
    }
});


/**
 * 用户登入
 */
router.post('/login', (req, res) => {
    const { username, password } = req.query;

    console.log(username, password)
    
    if (!username || !password) return res.send({ success: false, message: `内部错误` });
    
    Users.findOne({ username, password }).then(data => {
        if (data) {
            res.send({ sucess: true, message: `登录成功` });
        } else {
            res.send({ success: false, message: `用户名和密码不正确` });
        }
    }).catch(err => {
        return res.send({ success: false, message: `内部错误` });
    });
});

module.exports = router;