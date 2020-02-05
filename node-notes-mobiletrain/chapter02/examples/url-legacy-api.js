/**
 * 遗留的 URL API 
 */
const url = require('url');

let urlString = 'https://user:pass@sub.example.com:8080/path/recommend/hot?type=string#hash';

/// url.parse(url_string)  将 url字符串转成 url对象
let urlObj = url.parse(urlString);
console.log('urlObj >>', urlObj);
// urlObj >> Url {
//     protocol: 'https:',
//     slashes: true,
//     auth: 'user:pass',
//     host: 'sub.example.com:8080',
//     port: '8080',
//     hostname: 'sub.example.com',
//     hash: '#hash',
//     search: '?type=string',
//     query: 'type=string',
//     pathname: '/path/recommend/hot',
//     path: '/path/recommend/hot?type=string',
//     href: 'https://user:pass@sub.example.com:8080/path/recommend/hot?type=string#hash'
// }

/// url.format(obj)  将 url对象转成 url字符串对象
let str = url.format(urlObj);
console.log('str >>', str);
// str >> https://user:pass@sub.example.com:8080/path/recommend/hot?type=string#hash
