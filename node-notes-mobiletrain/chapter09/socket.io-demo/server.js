const express = require('express');
const path = require('path');

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
// 将 socket 服务器和 express 进行结合

app.use(express.static(path.join(__dirname, '/client')));

app.get('/', (req, res) => {
    // res.send('<h1>Hello Socket.io<h1>');
    res.sendFile(path.join(__dirname, '/index.html'));
});

// 监听客户端连接
io.on('connection', socket => {
    // 触发 message-event 自定义事件
    // socket.emit('message-event', `欢迎光临`);

    let robotMsg = {
        '爱': '爱❤静静~',
        '静静': '爱❤静静~',
        '漂亮': '爱❤静静，好看的静静~',
        '想': '爱❤静静，想❤静静~',
        '美的': '宝宝美美的'
    };

    socket.on('chat-message', msg => {
        console.log(`宝宝说：${msg}`);
        let returnMsg = '', namePrefix = '锅锅说：';
        returnMsg = namePrefix + robotMsg[msg];
        socket.emit('message', returnMsg);
    });

    socket.on('disconnect', () => {
        console.log(`user disconnected`);
    })
    
    // 接收客户端触发的 received-event 事件
    // socket.on('received-event', msg => {
    //     console.log(`>>>>>>>> socket.io server >>>>>>>> ${msg}`);
    // });
});

server.listen(3050, '0.0.0.0', () => {
    console.log(`listening on *:3050`);
});