const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// 先创建 Schema
const Users = new Schema({
    username: {
        type: String,
        required: true
      },
      password: {
        type: String,
        require: true
      },
      email: {
        type: String,
        require: true
      }
});

// 通过 Schema 创建 Model
module.exports = mongoose.model('users', Users);