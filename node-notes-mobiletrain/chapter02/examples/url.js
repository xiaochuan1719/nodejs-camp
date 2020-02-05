const url = require('url');

/// Parsing the URL string using the Legacy API:
const demoURL01 = new URL('https://user:pass@sub.example.com:8080/path/recommend/hot?type=string#hash');

console.log('demoURL01', demoURL01);
// demoURL01 URL {
//     href: 'https://user:pass@sub.example.com:8080/path/recommend/hot?type=string#hash',
//     origin: 'https://sub.example.com:8080',
//     protocol: 'https:',
//     username: 'user',
//     password: 'pass',
//     host: 'sub.example.com:8080',
//     hostname: 'sub.example.com',
//     port: '8080',
//     pathname: '/path/recommend/hot',
//     search: '?type=string',
//     searchParams: URLSearchParams { 'type' => 'string' },
//     hash: '#hash'
// }


/// Parsing the URL string using the WHATWG API:
const demoURL02 = new URL('https://user:pass@sub.example.com:8080/path/recommend/hot?type=string#hash');
console.log('demoURL02', demoURL02);
// demoURL02 URL {
//     href: 'https://user:pass@sub.example.com:8080/path/recommend/hot?type=string#hash',
//     origin: 'https://sub.example.com:8080',
//     protocol: 'https:',
//     username: 'user',
//     password: 'pass',
//     host: 'sub.example.com:8080',
//     hostname: 'sub.example.com',
//     port: '8080',
//     pathname: '/path/recommend/hot',
//     search: '?type=string',
//     searchParams: URLSearchParams { 'type' => 'string' },
//     hash: '#hash'
// }

