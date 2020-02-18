module.exports = options => {
  return async (req, res, next) => {
    // inflection.singularize() 单词的复数转单数
    const modelName = require("inflection").singularize(req.params.resource)
    req.Model = require(`../models/${modelName}.model`)
    next()
  }
}
