const fs = require('fs');

/**
 * 异步创建目录
 * fs.mkdir(path[, options], callback)  Asynchronously creates a directory
 */ 
fs.mkdir('./test', (err) => {
    if (err) throw err;
})

/**
 * 更改目录名称
 * fs.rename(oldPath, newPath callback)  Asynchronously rename file at oldPath to the pathname provided as newPath.
 */
fs.rename('./test', './test02', (err) => {
    if (err) throw err;
    console.log(`Rename complete!`);
});


/**
 * 删除目录 (只能删除空目录)
 * fs.rmdir(path[, options], callback)  Asynchronous rmdir
 */
fs.rmdir('./test02', (err) => {
    if (err) {
        console.log(`删除目录失败`);
        console.log(err);
    } else {
        console.log(`删除目录成功`);
    }
});