// module.exports = async (req, res, next) => {
//   // 中间件 校验用户是否登录
//   const token = String(req.headers.authorization || "")
//     .split(" ")
//     .pop();
//   assert(token, 401, "jwt token 已失效");
//   const { _id } = jwt.verify(token, app.get("secret"));
//   assert(_id, 401, "无效的 jwt token");
//   // 挂在到 req 上，以便后续可以使用该数据
//   req.admin = await Admins.findById(_id);
//   assert(req.admin, 401, "请先登录");
//   await next();
// };

// 上述可配置性、可扩展性不好

module.exports = options => {
  const jwt = require('jsonwebtoken')  
  const assert = require('http-assert')
  const Admins = require('../models/admin.model')

  return async (req, res, next) => {
    // 中间件 校验用户是否登录
    const token = String(req.headers.authorization || "").split(" ").pop()
    assert(token, 401, "jwt token 已失效")
    const { _id } = jwt.verify(token, req.app.get("secret"))
    assert(_id, 401, "无效的 jwt token")
    // 挂在到 req 上，以便后续可以使用该数据
    req.admin = await Admins.findById(_id)
    assert(req.admin, 401, "请先登录")
    await next()
  }
}
