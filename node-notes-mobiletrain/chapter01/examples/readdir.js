const fs = require('fs');

/// 同步读取目录内容   注：在关键位置捕获错误信息
/// fs.readdirSync(path[, options])    Synchronous readdir
const options = {
    encoding: 'utf8',
    withFileTypes: true
};

try {
    // let dirs_sync = fs.readdirSync('./', options);
    let dirs_sync = fs.readdirSync('./');
} catch (err) {
    console.log('读取出错');
    console.log(err);
}

console.log('同步读取 >>', dirs_sync);



/// 异步读取目录内容
/// fs.readdir(path[, options], callback)   Asynchronous readdir
fs.readdir('../examples', (err, files) => {
    console.log(err)
    console.log('异步读取 >>', files);
});

/// 错误优先回调：
/// 错误优先的回调函数用于传递错误和数据；第一个参数始终应该是一个错误对象，用于检查程序是否发生了错误。
///
/// 在回调函数中第一个参数表示错误对象，默认为 null; 如果出现错误 err，就是错误对象
/// 即：回调函数的第一个参数是 err 信息，默认为 null；只有第一个参数为 null 的情况下，之后的参数才有意义（才为实际返回结果）

fs.readdir('../examples01', (err, files) => {
    if (err) {
        console.log('读取错误');
    } else {
        console.log('异步读取 >>', files);
    }
});


/**
 * 错误处理：
 *  同步代码： try catch
 *  异步代码： 错误回调优先，回调函数中判断 err
 * 
 * 目录的操作：
 *  CURD - create, update, read, del
 */