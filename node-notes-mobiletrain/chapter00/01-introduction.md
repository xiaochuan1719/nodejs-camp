## 模块化


### 基本概念

> 在 node.js 中，应用由模块组成，node.js 中采用 CommonJS 模块规范。

- 一个 javascrit 文件就是一个模块

- 每个模块都是一个独立的作用域，在这个模块文件中定义的变量、函数、对象都是私有的，对其他文件不可见


### Node 中模块分类

- ① 核心模块（内置模块 built-in modules）

    由 Node 本身提供，不需要单独安装（npm）,可直接引入使用

- ② 第三方模块

    由社区或个人提供，需要通过 npm 安装后使用

- ③ 自定义模块

    由我们自己创建，比如：tool.js, user.js


### 核心模块 built-in modules

- fs：文件操作模块

- http：网络操作模块

- path：路径操作模块

- url：解析地址的模块

- queryString：解析参数字符串的模块

使用方法：先引入，再使用

```js
const fs = require('fs');
```


### 第三方模块

第三方模块是由社区或个人提供，可以在 npm 仓库查找：[https://www.npmjs.com/](https://www.npmjs.com/)

使用方法：先通过 `npm install`，再引入，最后使用


### 用户自定义模块

由开发人员创建的模块（javascript文件）

使用方法：先创建模块，再引入模块