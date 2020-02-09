const express = require('express');

const db = require('./db/connect');
const userRouter = require('./routes/user');

const app = express();
const PORT = 3050;

db.start();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 设置跨域访问 CORS
app.all('*', (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    // res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

app.use('/user', userRouter);

app.listen(PORT, () => {
    console.log(`Server started in port: ${PORT}`);
}); 