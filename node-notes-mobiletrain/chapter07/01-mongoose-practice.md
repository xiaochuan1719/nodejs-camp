## Express + Mongoose 基础实战

- 注册接口开发

- 登录接口开发

- 邮箱模块封装 + 邮箱验证码

  1. 获取邮箱验证码接口

        a. 发送邮件

        b. 邮箱和验证码保存到内存中


### apiDoc 生成接口文档

#### 1. 安装 apiDoc 

安装 apiDoc 可全局安装也可局部安装，一般建议局部安装，这样可以保证协作开发时版本一致性

```shell
npm install apidoc -D
# 或者
yarn add apidoc -D
```

切换到工程目录下，执行如下命令：

```shell
apidoc -i ./ -o -docs
# apidoc -i 目标目录 -o 生成目录
```

即可简单生成 API 文档。

**注意：**注释规范需要按照官网要求填写，否则无法正常生成文档

APIDOC官方文档：[https://apidocjs.com/](https://apidocjs.com/)
