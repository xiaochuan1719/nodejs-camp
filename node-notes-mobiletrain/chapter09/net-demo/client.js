const net = require('net');
const readline = require('readline');

// 逐行读取
// 创建 readline 实例
const rl = readline.createInterface(process.stdin, process.stdout);

// 与指定 IP 地址和端口号的服务端建立连接
// port 数值类型的服务端的端口号
// host 字符串类型的服务端的IP地址 
// 当这个新建的客户端与指定的服务端建立了连接之后，触发该回调函数，该回调函数没有参数，
// 回调函数内部用自定义的变量client来代表这个客户端
const client = net.connect({port: 3050, host: '127.0.0.1'}, () => {
    // 从客户端向服务端发送数据
    rl.on('line', (line) => {
        client.write(line.trim());
    });

    // 接收服务端发送的数据
    client.on('data', (chunk) => {
        console.log(chunk.toString());
    })

    client.on('error', (err) => {
        console.log(`服务端断开连接~`);
    });

});