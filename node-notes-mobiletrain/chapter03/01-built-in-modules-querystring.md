## Query String

> The `querystring` module provides utilities for parsing and formating URL query strings.

`querystring` 模块提供用于解析和格式化 URL 查询字符串的实用工具。

```js
const querystring = require('querystring');
```

### querystring.parse(str[, sep[, eq[, options]]])

- `str`  `<string>`  The URL query string to parse

- `sep`  `<string>`  The substring used to delimit key and value pairs in the query string. **Default: '&'**

- `eq`   `<string>`  The substring used to delimit keys and values in the query string. **Default: '='**

- `options`  `<Object>`  

    + `decodeURLComponent`  `<Function>`  The function to use when decoding percent-encoded characters in the string. **Default: `querystring.unescape()`**

    + `maxKeys`  `<number>`  Specifies the maximum number of keys to parse. Specify `0` to remove key counting limitations. **Default: 1000**

`querystring.parse()` 方法将 URL 查询字符串 `str` 解析为键值对的集合。

```js
let paramStr = `name=loong&password=123123&islogin=true`;

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
```


### querystring.stringify(obj[, sep[, eq[, options]]])

- `obj`  `<Object>`  The object to serialize into a URL querystring

- `sep`  `<string>`  The substring used to delimit key and value pairs in the query string. **Default: '&'**

- `eq`  `<string>`  The substring used to delimit keys and values in the query string. **Default: '='**

- `options`  

    + `encodeURIComponent`  `<Function>`  The function to use when converting URL-unsafe characters to percent-encoding in the query string. **Default: querystring.escape()** 

`querystring.stringify()` 方法通过迭代对象的自身属性从给定的 `obj` 生成 URL 查询字符串。

```js
const paramObj = {username: 'loonger', password: '888888', token: 'hduueoo99880sdfhkdh082'};

paramStr = querystring.stringify(paramObj);
console.log(paramStr);
// username=loonger&password=888888&token=hduueoo99880sdfhkdh082

paramStr = querystring.stringify(paramObj, ';', ':');
console.log(paramStr);
// username:loonger;password:888888;token:hduueoo99880sdfhkdh082
```


### querystring.escape(str)

> The `querystring.escape()` method performs URL percent-encoding on the given str in a manner that is optimized for the specific requirements of URL query strings.

`querystring.escape()` 方法以对 URL 查询字符串的特定要求进行了优化的方法对给定的 `str` 执行 URL 百分比编码。

> The `querystring.escape()` method is used by `querystring.stringify()` and is generally not expected to be used directly.

```js
paramStr = 'username=中文&password=888888';
console.log(querystring.escape(paramStr));
// username%3D%E4%B8%AD%E6%96%87%26password%3D888888
```


### querystring.unescape(str)

> The `querystring.unescape()` method performs decoding of URL percent-encoded characters on the given `str`.

`querystring.unescape()` 方法在给定的 str 上执行 URL 百分比编码字符的解码。

> The `querystring.unescape()` method is used by `querystring.parse()` and is generally not expected to be used directly. 

```js
encodedParamStr = 'username%3D%E4%B8%AD%E6%96%87%26password%3D888888';
console.log(querystring.unescape(encodedParamStr));
// username=中文&password=888888
```