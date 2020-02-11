const WebSocket = require('ws');

const server = new WebSocket.Server({ port: 3050 }, () => {
    console.log(`Socket Start`);
});

const clients = [];

server.on('connection', (ws) => {

    clients.push(ws);

    // 发送字符串 或 二进制数据
    ws.send(`欢迎光临`);

    // 接受前端发送来的消息
    ws.on('message', (msg) => {
        console.log(`来自前端的数据：${msg}`);
        if (msg.indexOf('广播') !== -1) {
            sendToAll();
        }
    });

    // 前端主动断开连接
    ws.on('close', (msg) => {
        console.log(`前端主动断开连接`);
    });
});

function sendToAll() {
    // 群发
    for (let index = 0; index < clients.length; index++) {
        clients[index].send(`通知：明天放假啦！！`);
    }
};
