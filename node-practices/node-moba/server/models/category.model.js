const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    name: { type: String },
    // 知识点：类型定义为 ObjectId  ref关联到哪个模型
    parent: { type: mongoose.SchemaTypes.ObjectId, ref: 'Categories' }
})

module.exports = mongoose.model('Categories', schema)