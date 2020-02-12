const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();

// 不使用签名
app.use(cookieParser());

// 如果需要使用签名，需要指定一个 secret, 字符串， 否则会报错
// app.use(cookieParser('aassddffgghhjjkkll'));


/// API说明
// 设置 cookie, value：类型为 String 和 Object; 
// 如果是 Object 会在 cookie.serialize() 之前自动调用 JSON.stringify 对其进行处理
// res.cookie(key, value, options)
//
// 清除 cookie
// res.clearCookie(name, options)

app.get('/user/login', (req, res) => {
    // 首次访问 Prints：[Object: null prototype] {}
    console.log(req.cookies);

    const options = {
        // Specifies the value for the Domain Set-Cookie attribute. 
        // 类型：String  在什么域名下有效，默认为网站域名
        domain: '',
        // Specifies the value for the Path Set-Cookie attribute.
        // 类型：String  在什么路径下有效，默认为 '/'
        path: '/user',
        // Specifies the Date object to be the value for the Expires Set-Cookie attribute. 
        // 类型：Date  cookie过期时间；如果没有设置或设置为0，那么这个cookie只在当前会话期间有效，
        // 关闭浏览器后，这个cookie会被浏览器删除
        expires: new Date(Date.now() + 900000),
        // Specifies the boolean value for the Secure Set-Cookie attribute. 
        // 类型：Boolean  只能被 HTTPS 使用，默认为 false
        secure: false,
        // Specifies the boolean value for the HttpOnly Set-Cookie attribute. 
        // 类型：Boolean  只能被 web server 访问
        httpOnly: true,
        // Specifies the number (in seconds) to be the value for the Max-Age Set-Cookie attribute. 
        // 类型：Number  实现expires的功能，设置cookie过期的时间，指明从现在开始，多少毫秒以后，cookie到期
        maxAge: 14 * 86400 * 1000,
        // Specifies the boolean or string to be the value for the SameSite Set-Cookie attribute.
        // `true` will set the SameSite attribute to Strict for strict same site enforcement.
        // `false` will not set the SameSite attribute.
        // `lax`  will set the SameSite attribute to Lax for lax same site enforcement.
        // 'none' will set the SameSite attribute to None for an explicit cross-site cookie.
        // 'strict' will set the SameSite attribute to Strict for strict same site enforcement.
        // 注意：该属性还未成为标准，未来可能会有变化；所以一般我们可忽略不进行设置
        sameSite: false,
        // 使用签名
        // 类型：Boolean  默认为 false；
        // express会使用req.secret来完成签名，需要cookie-parser配合使用
        signed: false
    };
    
    // 设置cookies
    res.cookie('islogin', 'true', options);
    res.cookie('cart', { items: [1, 2, 3] });
    res.cookie('busines_list', { 
        items: [
            { name: 'openAccount', code: 'oa' },
            { name: 'openHGT', code: 'hgt' }
        ] 
    }, { maxAge: 800000 });

    res.send(`❤ Login OK ❤`);
});

// app.get('/user/login', (req, res) => {
//     console.log('cookies', req.cookies);
//     console.log('signedCookies', req.signedCookies);
//     if (req.signedCookies.islogin === 'true') {
//         res.send('欢迎回来');
//     } else {
//         console.log('设置singed cookie');
//         res.cookie('islogin', 'true', { maxAge: 14 * 86400 * 1000, signed: true });
//         res.send(`模拟登录成功`);
//     }
// });

app.listen(3050, () => {
    console.log(`Listening on *:3050`);
});