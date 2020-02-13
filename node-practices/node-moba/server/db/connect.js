module.exports = app => {
    const mongoose = require('mongoose')

    const options = {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }

    mongoose.connect('mongodb://127.0.0.1:27017/node-vue-moba', options)
}