module.exports = app => {
    const mongoose = require('mongoose')

    const options = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    }

    mongoose.connect('mongodb://127.0.0.1:27017/node-vue-moba', options)
}