const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    // 知识点：类型定义为 ObjectId  ref关联到哪个模型
    categories: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Categories' }],
    title: { type: String },
    content: { type: String }
})

module.exports = mongoose.model('Articles', schema)