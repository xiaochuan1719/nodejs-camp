const querystring = require('querystring');

let paramStr = `name=loong&password=123123&islogin=true`;

/// querystring.parse(str[, sep[, eq[, options]]])
/// The `querystring.parse()` method parses a URL query string(`str`) into 
/// a collection of key and value pairs.

let strObj = querystring.parse(paramStr);
console.log(strObj);
// [Object: null prototype] {
//     name: 'loong',
//     password: '123123',
//     islogin: 'true'
// } 

paramStr = `name-loong#password-123123#islogin-true`;
strObj = querystring.parse(paramStr, '#', '-');
console.log(strObj);
// [Object: null prototype] {
//     name: 'loong',
//     password: '123123',
//     islogin: 'true'
// }


/// querysring.stringify(obj[, sep[, eq[, options]]])
/// The querystring.stringify() method produces a URL query string from a given obj 
/// by iterating through the object's "own properties".

const paramObj = {username: 'loonger', password: '888888', token: 'hduueoo99880sdfhkdh082'};
paramStr = querystring.stringify(paramObj);
console.log(paramStr);
// username=loonger&password=888888&token=hduueoo99880sdfhkdh082

paramStr = querystring.stringify(paramObj, ';', ':');
console.log(paramStr);
// username:loonger;password:888888;token:hduueoo99880sdfhkdh082


/// querystring.escape(str)
/// The querystring.escape() method performs URL percent-encoding on the given str 
/// in a manner that is optimized for the specific requirements of URL query strings.

paramStr = 'username=中文&password=888888';
console.log(querystring.escape(paramStr));
// username%3D%E4%B8%AD%E6%96%87%26password%3D888888


/// querystring.unescape(str)
/// The querystring.unescape() method performs decoding of URL percent-encoded 
/// characters on the given str.

encodedParamStr = 'username%3D%E4%B8%AD%E6%96%87%26password%3D888888';
console.log(querystring.unescape(encodedParamStr));
// username=中文&password=888888