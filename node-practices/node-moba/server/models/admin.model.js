const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    admin_name: { type: String },
    password: { 
        type: String, 
        // 默认查询操作时，当前字段不进行查询返回
        select: false,
        set: function (val) { return require('bcryptjs').hashSync(val, 10) } 
    }
})

module.exports = mongoose.model('Admins', schema)