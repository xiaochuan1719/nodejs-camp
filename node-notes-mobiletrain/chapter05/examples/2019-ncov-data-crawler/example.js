const https = require('https');
const fs = require('fs');
const iconv = require('iconv-lite');
const cheerio = require('cheerio');


// 由于该页面是动态获取数据的，所以爬取到的网页是没有关键数据的，只有网页结构
let url = 'https://news.qq.com/zt2020/page/feiyan.htm?from=timeline&isappinstalled=0';

https.get(url, (res) => {

    const { statusCode } = res;
    const contentType = res.headers['content-type'];

    console.log(statusCode, contentType);

    let error = '';
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

    let rawData = '';

    res.on('data', (chunk) => {
        // 解决中文编码网页乱码问题
        chunk = iconv.decode(chunk, 'gb2312');
        rawData += chunk;
        // console.log(rawData)
        // console.log(rawData.toString('utf8'));
    });

    res.on('end', () => {
        fs.writeFile('./news-2019ncov.html', rawData, (err) => {
            if (err) throw err;
        });

        // cheerio 
        const $ = cheerio.load(rawData, { decodeEntities: false });
        console.log($('span.add-confirm').html());        

        console.log(`数据传输完毕`);
    });

}).on('error', (err) => {
    console.log(`Got error: ${err.message}`);
});