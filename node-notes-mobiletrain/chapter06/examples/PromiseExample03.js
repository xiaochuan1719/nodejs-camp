const fs = require('fs');

// 封装文件是否存在
function isExist(path) {
    return new Promise((resolve, reject) => {
        fs.stat(path, (err, stats) => {
            if (err) {
                reject(`文件不存在`)
            } else {
                resolve(path)
            }
        })
    })
}

function delFile(path) {
    return new Promise((resolve, reject) => {
        fs.unlink(path, (err) => {
            if (err) {
                reject(`删除文件失败`)
            } else {
                resolve(`删除文件成功`)
            }
        })
    }) 
}


/// 链式调用  一个链式调用只需要一个 catch
/// 链式调用如何终止执行：
///   1. throw new Error()  抛出错误异常可终止
///   2. return Promise.reject()  执行 reject 也可以终止

isExist('./test.js').then((path) => {
    // 判断文件是否存在成功处理
    return delFile(path)
}).then((msg) => {
    // 删除文件成功处理
    console.log(msg)
}).catch((err) => {
    console.log(err)
})
