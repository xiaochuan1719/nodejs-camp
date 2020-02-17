const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    name: { type: String },
    items: [{
        // 广告图片地址
        image: { type: String },
        // 跳转链接
        url: { type: String }
    }]
})

module.exports = mongoose.model('Ads', schema)