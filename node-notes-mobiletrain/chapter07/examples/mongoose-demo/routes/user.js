const router = require("express").Router();
const Users = require("../models/users.model");

const mailUtil = require("../utils/mailUtil");

// 缓存验证码
const codes = {};

/**
 * @api {post} /user/regist  用户注册
 * @apiVersion 1.0.0
 * @apiName 用户注册
 * @apiGroup User
 *
 * @apiParam {String} username 用户名称
 * @apiParam {String} password 用户密码
 * @apiParam {String} email 用户邮箱地址
 * @apiParam {String} code 邮箱验证码
 *
 * @apiSuccess {Boolean} success 请求是否成功
 * @apiSuccess {String} message  报文
 */
router.post("/regist", (req, res) => {
  // 获取数据
  const { username, password, email, code } = req.body;
  if (!username || !password || !email || !code) {
    res.send({ success: false, message: `参数错误` });
  } else {
    if (codes[email] !== code) {
      return res.send({ success: false, message: `验证码错误，请重试` });
    }
    Users.find({ username })
      .then(data => {
        if (!data || data.length === 0) {
          const registUser = new Users({
            username,
            password,
            email
          });

          // 用户名不存在，则注册
          return Users.insertMany(registUser);
        } else {
          // res.send({ success: false, message: `用户名已存在` });
          // 上述代码造成异常信息抛出：
          // (node:18564) UnhandledPromiseRejectionWarning: Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client...
          return Promise.reject({ success: false, message: `用户名已存在` });
        }
      })
      .then(data => {
        res.send({ success: true, message: `注册成功` });
      })
      .catch(err => {
        if (err) {
          res.send(err);
        } else {
          res.send({ success: false, message: `注册失败` });
        }
      });
  }
});

/**
 * @api {post} /user/login  用户登录
 * @apiVersion 1.0.0
 * @apiName 用户登录
 * @apiGroup User
 *
 * @apiParam {String} username 用户名称
 * @apiParam {String} password 用户密码
 *
 * @apiSuccess {Boolean} success 请求是否成功
 * @apiSuccess {String} message  报文
 */
router.post("/login", (req, res) => {
  const { username, password } = req.query;

  console.log(username, password);

  if (!username || !password)
    return res.send({ success: false, message: `内部错误` });

  Users.findOne({ username, password })
    .then(data => {
      if (data) {
        res.send({ sucess: true, message: `登录成功` });
      } else {
        res.send({ success: false, message: `用户名和密码不正确` });
      }
    })
    .catch(err => {
      return res.send({ success: false, message: `内部错误` });
    });
});

/**
 * @api {post} /user/getMailCode  获取邮箱验证码
 * @apiVersion 1.0.0
 * @apiName 获取邮箱验证码
 * @apiGroup User
 *
 * @apiParam {String} email     邮箱地址
 *
 * @apiSuccess {Boolean} success 请求是否成功
 * @apiSuccess {String} message  报文
 */
router.post("/getMailCode", (req, res) => {
  let { email } = req.body;
  // 产生随机码
  let code = parseInt(Math.random() * 10000);
  console.log(codes);
  mailUtil
    .sendMail(email, code)
    .then(data => {
      // 发送成功后，缓存到内存中
      codes[email] = code + "";
      console.log("codes", codes);
      res.send({ success: true, message: `验证码发送成功` });
    })
    .catch(err => {
      res.send({ success: false, message: `验证码发送失败` });
    });
});

module.exports = router;
