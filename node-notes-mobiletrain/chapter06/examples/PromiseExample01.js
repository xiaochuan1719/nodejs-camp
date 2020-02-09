const fs = require('fs');

/// 删除当前目录下的 test.js 文件

// 首先需要判断文件是否存在，存在则执行删除操作
fs.stat('./test.js', (err, stats) => {
    if (err) {
        console.log(`文件不存在`);
    } else {
        fs.unlink('./test.js', (err) => {
            if (err) {
                console.log(err);
            } else {
                console.log(`删除文件成功`)
                fs.writeFile('./test.js', 'xxxxxx', (err) => {
                    if (err) throw err;
                });
            }
        })
    }
})

/// 总结：异步操作需要保持一定的执行顺序：回调函数的嵌套 => 回调地狱
/// 解决回调地狱：常用的异步编程方法
/// Promise, async/await, bluebird， Q ...


