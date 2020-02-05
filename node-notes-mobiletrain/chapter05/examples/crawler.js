const https = require('https');
const fs = require('fs');

let url = 'https://www.infoq.cn/';
// let url = 'https://nodejs.org/dist/index.json';

https.get(url, (res) => {

    const { statusCode } = res;
    const contentType = res.headers['content-type'];

    console.log(statusCode, contentType);

    let error;
    if (statusCode !== 200) {
        error = new Error(`Request Failed.\nStatus Code: ${statusCode}`);
    } else if (!/^text\/html/.test(contentType)) {
        error = new Error(`Invalid content-type.\nExpected text/html but received ${contentType}`);
    }

    if (error) {
        console.log(error.message);
        // Consume response data to free up memory  清理缓存
        res.resume();
        return;
    }

    res.setEncoding('utf8');

    let rawData = '';

    // 数据分段 只要接受数据就会触发 data 事件；chunk：每次接受的数据片段
    res.on('data', (chunk) => {
        console.log(chunk);
        rawData += chunk;
    });

    // 数据流传输完毕
    res.on('end', () => {
        // 将请求的数据保存到本地
        fs.writeFile('./infoq.html', rawData, (err) => {
            if (err) throw err;
        })
        console.log('数据传输完毕');
    });

}).on('error', (err) => {
    console.error(`Got error: ${err.message}`);
});