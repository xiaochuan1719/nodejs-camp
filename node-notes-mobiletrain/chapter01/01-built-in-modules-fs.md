## File System

> The `fs` module provides an API for interacting with the file system in a manner closely modeled around standard POSIX functions.

To use this module:

```js
const fs = require('fs');
```

**All file system operations have synchronous and asynchronous forms.**


### 打印当前目录的目录树

任务目标：打印当前目录的目录树

- 目录操作：读取目录、创建目录、更改目录、删除目录

- 文件操作：读取文件、创建文件、写入文件、删除文件

#### 读取目录内容及错误处理

```js
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
```

#### 目录操作：创建目录、更改目录、删除目录

```js
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
```


#### 文件操作：创建文件、写入文件、读取问价、删除文件

```js
const fs = require('fs');

/// 创建文件 覆盖写入
/// fs.writeFile(file, data[, options], callback)
const data = new Uint8Array(Buffer.from(`一起来学Java吧`));
fs.writeFile(`message.txt`, data, (err) => {
    if (err) throw err;
    console.log(`The file has been saved!`);
});


/// 写入文件
/// fs.appendFile(file, data[, options], callback)
///  Asynchronously append data to a file, creating the file if it does not yet exist.
fs.appendFile(`message.txt`, `>>data to append`, (err) => {
    if (err) throw err;
    console.log(`The "data to append" was appended to file!`);
});


/// 读取文件
/// fs.readFile(path[, options], callback)
///   Asynchronously reads the entire contents of a file
fs.readFile('message.txt', (err, data) => {
    if (err) throw err;
    console.log('message:', data);
    // Prints: message: <Buffer e4 b8 80 e8 b5 b7 e6 9d a5 e5 ad a6 4a 61 76 61 e5 90 a7 0a 64 61 74 61 20 74 6f 20 61 70 70 65 6e 64>

    console.log('message to utf8:', data.toString('utf8'));
    // Prints: message to utf8: 一起来学Java吧>>data to append
});

fs.readFile('message.txt', 'utf-8', (err, data) => {
    if (err) throw err;
    console.log('message to utf8：', data);
    // Prints: message to utf8： 一起来学Java吧>>data to append
});


/// 删除文件
/// fs.unlink(path, callback)
///  Asynchronously removes a file or symbolic link
fs.unlink('message.txt', (err) => {
    if (err) throw err;
    console.log(`message.txt was deleted!`);
});
```


#### Class: fs.Stats

A `fs.Stats` object provides information about a file.

> **Objects returned from fs.stat(), fs.lstat() and fs.fstat() and their synchronous counterparts are of this type.**

`fs.stat()`、`fs.lstat()` 和 `fs.fstat()` 及其同步的方法返回的对象都属于此类型。

```js
fs.stat('./test02', (err, stats) => {
    if (err) throw err;
    if (stats.isFile()) {
        console.log(`test02 is file`);
    } else {
        console.log(`test02 is dir`);
    }
})
```


#### 任务实现：打印当前目录的目录树

```js
const fs = require('fs');

fs.readdir('./', (err, dirs) => {
    if (err) throw err;
    for (let index = 0; index < dirs.length; index++) {
        console.log(dirs[index]);
        fs.stat(dirs[index], (err, stats) => {
            if (stats.isDirectory()) {
                fs.readdir(dirs[index], (err, dirs) => {
                    if (err) throw err;
                    for (let k = 0; k < dirs.length; k++) {
                        console.log(`\t` + dirs[k]);
                    }
                });
            }
        });
    };
});

// 问题：遍历子目录的时候不能跟随追加，和异步逻辑有关系；待优化
// 循环遍历的逻辑可以考虑是使用递归函数
```