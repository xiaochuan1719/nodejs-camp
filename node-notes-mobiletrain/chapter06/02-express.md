## Express Getting started

### 安装 express

```js
npm install express
// 或者 yarn add express
```

### 一个简单的 API 接口创建

```js
const express = require('express');

// express 实例化
const app = express();

/// 知识点： Express v4.16.0及更高版本中提供了此中间件： express.json() 和 express.urlencoded()
/// 其他版本需要引入 body-parser 模块；上述的中间件也是基于 body-parser 的
// for parsing application/json  json
app.use(express.json());
// for parsing application/x-www-form-urlencoded  formdata
app.use(express.urlencoded({ extended: true }));

const PORT = 3000;

// 登录接口
app.get('/user/login', (req, res) => {
    // 接受 get 请求参数： request.query
    console.log(req.query);

    let { username, password } = req.query;

    if (username === 'loonger' && password === '123456') {
        res.send({ err: 0, msg: 'login ok' });
    } else {
        res.send({ err: -1, msg: 'username and password not ok' });
    }
})

app.post('/user/regist', (req, res) => {
    // 接受 post 请求数据：消息体、请求体
    console.log(req.body);
    // Prints： undefined

    let { username, password } = req.body; 

    /// 知识点：express 不能直接解析消息体
    /// 需要通过第三方的插件 body-parser 实现解析；但是 express 4.16.0 及以上版本
    /// 已经内置相关中间件，直接使用即可

    if (username === 'loonger' && password === '123456') {
        res.send(`Input OK!`);
    } else {
        res.send('Input Error!');
    }
})

app.listen(PORT, () => console.log(`Server start on port ${PORT}!`));

```

### Request Object

#### request.query

> This property is an object containing a property for each query string parameter in the route. If there is no query string, it is the empty object, {}.

**As req.query’s shape is based on user-controlled input, all properties and values in this object are untrusted and should be validated before trusting.**

#### request.body

> Contains key-value pairs of data submitted in the request body. By default, it is undefined, and is populated when you use body-parsing middleware such as `body-parser` and `multer`.

```js
const app = require('express')();
const bodyParser = require('body-parser');

// for parsing application/json
app.use(bodyParser.json());  
// for parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));  


/// 知识点：Express v4.16.0及更高版本中内置了此中间件： express.json() 和 express.urlencoded()
// for parsing application/json JSON
app.use(express.json());
// for parsing application/x-www-form-urlencoded 表单
app.use(express.urlencoded({ extended: true }));
```


### Middeware 中间件

+ 内置中间件 static, json, urlencoded  (v4.16.0+)

+ 自定义中间件：全局中间件 和 局部中间件

+ 第三方中间件：如 body-parser、拦截器

中间件使用一定要注意 `next()`

 
#### 静态资源目录 static

为了提供诸如图像、CSS文件和JavaScript文件之类的静态文件，请使用 Express 中的 `express.static` 内置中间件函数。

```js
express.static(root, [options])
```


### Router 路由

假设，现在我们尝试通过 `example.com/someone` 访问某人的推特或者微博主页，你会返现该请求的 HTTP 内容大致如下：

```
GET /someone http/1.1
```

其中包含了 HTTP 请求使用的方法（GET），URI 信息（/someone）以及 HTTP 协议版本（1.1）。

Express 中的路由就是负责将其中的 HTTP 方法和 URI 这对组合映射到对应的中间件。简单说就是。`/about_me` 的 GET 请求会执行某个中间件而对于 `/new_user` 的 POST 请求则执行另一个中间件。

#### 路由的简单示例

```js
const express = require('express');

const app = express();

app.get('./someone', (req, res) => {
    res.send(`Welcome to someone's homepage!`);
});

app.use((req, res) => {
    res.status(404).send(`Page not found!`);
});

app.listen(3050);
```

当通过 HTTP 的 GET 方法对 `/someone` 发起请求时，程序会执行该中间件中的代码，其他请求则会被忽略并跳转到下一个中间件。


#### 路由的特性

从工作原理来讲：路由就是通过对 HTTP 方法和 URI 的组合进行映射来实现对不同请求的分别处理。

##### 含参的统配路由

上述示例中使用的时全等判断来进行路由匹配的。虽然对于 `/someone` 这类非常管用，但是对于形如 `/users/1`、`/users/2` 这类 RESTful 路由就不太友好了。对于这种情况，使用 Express 中含参的通配路由来解决。

该方法的工作原理就是，在路由中使用参数进行通配表示。而该参数所表示的具体数值会在遍历 `params` 中获取到，下面时简单的代码示例：

```js
app.get('/users/:userid', (req, res) => {
    // 将 userId 转换为整型
    let userId = parseInt(req.params.userid, 10);
    // do something...
});
```

这样，无论是 `/users/123` 还是 `/users/8` 都会被映射到同一个中间件。

**注意：**虽然 `/users/` 或者 `/users/123/posts` 不会被匹配，但是 `/users/cake` 和 `/users/horse_ebooks` 却会被匹配到。所以，如果实现更精准的路由匹配还需其他方式。

##### 使用正则表达式匹配路由

使用正则来对路由进行更精准的匹配。

假设现在我们只需匹配 `/users/123` 和 `users/456` 这种通配参数为数字的动态路由的同时忽略其他路由格式，则需将代码改为：

```js
// 该参数必须是数字类型
app.get(/^\users\/(\d+)$/, (req, res) => {
    let userId = parseInt(req.params[0], 10);
});

// 匹配路由 /users/100-500 这类表示某个用户范围的列表页面
app.get(/^\/users\/(\d+)-(\d+)$/, (req, res) => {
    let startId = parseInt(req.params[0], 10);
    let endId = parseInt(req.params[1], 10);
});

// 更复杂的正则路由
// 比如：匹配某个含特定 UUID 的路由。UUID是一长串16进制的字符串
// xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx
// 如果，其中 x 表示任何 16 进制数字，而 y 只能是 8，9，A 或者 B；该路由的正则匹配就是：
const horribleRegexp = /^([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12})$/i;
app.get(horribleRegexp, (req, res) => {
    let uuid = req.params[0];
});
```