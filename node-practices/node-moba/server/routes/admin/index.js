// 导出一个函数，接收一个参数 app
module.exports = app => {
  const express = require("express")
  const router = express.Router({
      // 知识点：合并父级 URL 的参数到子路由，否则获取不到参数
      mergeParams: true
  })
  // 上面定义了一个新的路由，作为子路由来用

  // mergeParams： Preserve the req.params values from the parent router. 
  // If the parent and the child have conflicting param names, the child’s value take precedence.

  // const Categories = require('../../models/category.model')

  // 通用：修改成类似这样的引入方式
  // const Model = require(`../../models/${req.params.resource}`)

  router.post("/", async (req, res) => {
    const model = await req.Model.create(req.body)
    res.send(model)
  })

  router.put("/:id", async (req, res) => {
    const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)
    res.send(model)
  })

  router.delete("/:id", async (req, res) => {
    await req.Model.findByIdAndDelete(req.params.id, req.body)
    res.send({
      success: true
    })
  })

  router.get("/", async (req, res) => {
    // Added on 20200214：populate()  关联取出相关字段
    const queryOptions = {}
    if (req.Model.modelName === 'Categories') {
        queryOptions.populate = 'parent'
    }
    const items = await req.Model.find().setOptions(queryOptions).limit(10)
    // const items = await req.Model.find().populate("parent").limit(10)
    res.send(items)
  })

  router.get("/:id", async (req, res) => {
    const model = await req.Model.findById(req.params.id)
    res.send(model)
  })

  // Updated 20200214: 新增中间价处理通用 Model
  app.use("/admin/api/rest/:resource", (req, res, next) => {
    // inflection.singularize() 单词的复数转单数
    const modelName = require("inflection").singularize(req.params.resource)
    req.Model = require(`../../models/${modelName}.model`)
    next()
  }, router)

  const multer = require('multer')
  const upload = multer({
      dest: __dirname + '/../../uploads'
  })
  app.post('/admin/api/upload', upload.single('file'), async (req, res) => {
    const file = req.file
    file.url = `http://127.0.0.1:3050/uploads/${file.filename}`
    res.send(file)
  })

}
