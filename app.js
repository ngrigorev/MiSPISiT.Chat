const path = require('path');
const express = require('express');
const WebSocketServer = require("ws").Server;
const http = require("http");

const clients = new Set();
const port = process.env.PORT || 80;
const app = express();

app.use(express.static(path.join(__dirname, 'Client/dist')));
app.use((req, res) => {
    res.sendFile(path.join(__dirname, 'Client/dist/index.html'));
});

const server = http.createServer(app);

server.listen(port, () => {
    console.log(`Web run on http://localhost:${port}`);
});

const wss = new WebSocketServer({server: server})

wss.on('connection', socket => {
    console.log('new user');
    clients.add(socket);

    socket.on('message', function (message) {
        console.log('msg: ', message);
        for (let i of clients) {
            i.send(message);
        }
    });

    socket.on('close', function () {
        clients.delete(socket);
    });
});
