/**
 * 静态文件
 * express.static() 中间件
 */ 

const express = require('express');
const app = express();
const path = require('path');

const PORT = 3050;

console.log(__dirname);
console.log(path.join(__dirname, './testStaticDir'));

// 通过下面的代码就可以将 testStaticDir 目录下的图片、CSS文件、JavaScript文件对外开放访问了：
// app.use(express.static(path.join(__dirname, './testStaticDir')));
app.use(express.static('testStaticDir'));

// 在使用 express.static() 中间件的时候指定一个虚拟路径前缀，
// 就可以通过带有 /static 前缀地址来访问静态目录中的文件了
app.use('/static', express.static('staticDemo'));

app.listen(PORT, () => {
    console.log(`Server start`);
});
