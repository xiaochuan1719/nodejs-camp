# net 模块

## 利用 net 模块建立 socket 应用

使用 node.js 内置的 `net` 模块来创建 `socket` 服务端和 `socket` 客户端，实现一个简单的基于控制台的点对点通信。

### 1. 利用 `net` 模块建立 `socket` 客户端

```js
const net = require("net");
const readline = require("readline");

// 逐行读取
// 创建 readline 实例
const rl = readline.createInterface(process.stdin, process.stdout);

// 与指定 IP 地址和端口号的服务端建立连接
// port 数值类型的服务端的端口号
// host 字符串类型的服务端的IP地址
// 当这个新建的客户端与指定的服务端建立了连接之后，触发该回调函数，该回调函数没有参数，
// 回调函数内部用自定义的变量client来代表这个客户端
const client = net.connect({ port: 3050, host: "127.0.0.1" }, () => {
  // 从客户端向服务端发送数据
  rl.on("line", line => {
    client.write(line.trim());
  });

  // 接收服务端发送的数据
  client.on("data", chunk => {
    console.log(chunk.toString());
  });
});
```

### 2. 利用 `net` 模块建立 `socket` 服务端

```js
const net = require("net");
const readline = require("readline");

const rl = readline.createInterface(process.stdin, process.stdout);

// 创建一个 socket 服务端
// 创建了一个socket服务器，并用一个自定义的server变量来接收，当有客户端与该服务端建立连接时，
// 会触发执行该回调函数，并且回调函数内部使用指定的形参socket对象
const server = net.createServer(socket => {
  // 得到与本机相连接的那个远端客户端的端口号
  console.log(socket.remoteAddress);
  // 得到本机的IP地址
  console.log(socket.localAddress);
  // 得到该socket服务器所使用的端口号
  console.log(socket.localPort);

  rl.on("line", line => {
    // 从服务端向客户端发送数据
    socket.write(line.trim());
  });

  // 接受客户端发送的数据
  socket.on("data", chunk => {
    console.log(chunk.toString());
  });
});

// 让新创建的 socket 服务端监听一个指定的端口
// 知识点：为了避免出现端口被占用的情况出现，可以令port=0;，
// 0不是一个标准的端口号，传0的效果为系统会随机分配一个当前操作系统当中未被占用的端口号。
const port = 3050;
server.listen(port, err => {
  if (err) {
    console.log(`该端口被占用！`);
    return false;
  }
  console.log(`服务端正常启动，监听${port}端口！`);
});
```

控制台先启动 `server.js`，然后启动 `client.js` 文件；即可在两个端之间实现基于控制台的点对点收发消息
