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