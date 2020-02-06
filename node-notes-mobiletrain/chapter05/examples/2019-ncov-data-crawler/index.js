const https = require('https');
const fs = require('fs');
const cheerio = require('cheerio');
const iconv = require('iconv-lite');

// let url = 'https://news.qq.com/zt2020/page/feiyan.htm?from=timeline&isappinstalled=0';
let url = 'https://view.inews.qq.com/g2/getOnsInfo?name=disease_h5';  // 疫情实时数据

https.get(url, (res) => {

    res.setEncoding('utf8');

    let rawData = '';

    res.on('data', (chunk) => {
        rawData += chunk;
        // console.log(rawData);
    });

    res.on('end', () => {
        // 页面内容获取完成，解析页面
        // const $ = cheerio.load(rawData);
        // console.log(JSON.parse(rawData));

        // const rawDataObj = JSON.parse(rawData);
        // const data = JSON.parse(rawDataObj.data);
        // console.log(data)

        fs.writeFile('./desease_h5_20200206.json', rawData, (err) => {
            if (err) throw err;
        });
    });

}).on('error', (err) => {
    console.log(`Got error: ${err.message}`);
})