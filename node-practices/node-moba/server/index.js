const express = require('express')

const app = express()

app.use(require('cors')())
app.use(express.json())
// app.use(express.urlencoded())

app.use('/uploads', express.static(__dirname + '/uploads'))

// 注意这种模块的引入方式和模块的定义方式
require('./db/connect')(app)
require('./routes/admin')(app)

app.listen(3050, () => {
    console.log(`Listening on http://127.0.0.1:3050`)
});