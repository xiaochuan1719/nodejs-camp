// 导出一个函数，接收一个参数 app
module.exports = app => {
  const express = require("express")
  const jwt = require('jsonwebtoken')
  // 这个模块需要 express 5.x 版本才能发挥作用；该模块实际上适合 Koa 框架使用；Koa 也是基于 express 的
  const assert = require('http-assert')
  const router = express.Router({
      // 知识点：合并父级 URL 的参数到子路由，否则获取不到参数
      mergeParams: true
  })
  // 上面定义了一个新的路由，作为子路由来用

  // mergeParams： Preserve the req.params values from the parent router. 
  // If the parent and the child have conflicting param names, the child’s value take precedence.

  // const Categories = require('../../models/category.model')
  const Admins = require('../../models/admin.model')

  // 通用：修改成类似这样的引入方式
  // const Model = require(`../../models/${req.params.resource}`)

  /**
   * 创建资源
   */
  router.post("/", async (req, res) => {
    const model = await req.Model.create(req.body)
    res.send(model)
  })

  /**
   * 更新资源
   */
  router.put("/:id", async (req, res) => {
    const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)
    res.send(model)
  })

  /**
   * 删除资源
   */
  router.delete("/:id", async (req, res) => {
    await req.Model.findByIdAndDelete(req.params.id, req.body)
    res.send({
      success: true
    })
  })

  /**
   * 资源列表
   */
  router.get("/", async (req, res) => {
    // populate()  关联取出相关字段
    const queryOptions = {}
    if (req.Model.modelName === 'Categories') {
        queryOptions.populate = 'parent'
    }
    const items = await req.Model.find().setOptions(queryOptions).limit(10)
    // const items = await req.Model.find().populate("parent").limit(10)
    res.send(items)
  })

  /**
   * 资源详情
   */
  router.get("/:id", async (req, res) => {
    const model = await req.Model.findById(req.params.id)
    res.send(model)
  })

  // 登录校验中间件
  const authMiddleware = require('../../middleware/auth')

  const resouceMiddleware = async (req, res, next) => {
    // inflection.singularize() 单词的复数转单数
    const modelName = require("inflection").singularize(req.params.resource)
    req.Model = require(`../../models/${modelName}.model`)
    next()
  }

  // 新增中间件处理通用 Model
  app.use("/admin/api/rest/:resource", authMiddleware(), resouceMiddleware, router)

  // 文件上传
  const multer = require('multer')
  const upload = multer({
      dest: __dirname + '/../../uploads'
  })
  // 接收的表单字段名：file  formData里面的字段
  app.post('/admin/api/upload', authMiddleware(), upload.single('file'), async (req, res) => {
    const file = req.file
    file.url = `http://127.0.0.1:3050/uploads/${file.filename}`
    res.send(file)
  })

  // 登录接口
  app.post('/admin/api/login', async (req, res) => {
    const { admin_name, password } = req.body
      // 依据用户名查找用户
      const admin = await Admins.findOne({ admin_name }).select('+password')
    
      // if (!admin) {
      //   return res.status(422).send({
      //     message: '用户名和密码错误'
      //   })
      // }
      assert(admin, 422, '用户不存在')
      
      // 校验密码
      let isValid = require('bcryptjs').compareSync(password, admin.password)
      // if (!isValid) {
      //   return res.status(422).send({
      //     message: '用户名和密码错误'
      //   })
      // }
      assert(isValid, 422, '用户名和密码错误')
      // 返回token
      const token = jwt.sign({ id: admin._id, _id: admin._id }, app.get('secret'))
      res.send({ token })
  })

  // errorHandle 错误处理函数
  // express 5.x 版本才能捕获任意的异常信息
  app.use((err, req, res, next) => {
    console.log(err)
    res.status(err.statusCode || 500).send({
      message: err.message
    })
  })

}
