const path = require('path');
const express = require('express');
const {Server} = require('ws');

const clients = new Set();
const port = process.env.PORT || 80;
const server = express();

server.use(express.static(path.join(__dirname, 'Client/dist')));

server.use((req, res) => {
    res.sendFile('index.html');
});

const wss = new Server({ server });
wss.on('connection', ws => {
    clients.add(ws);

    ws.on('message', function (message) {
        for (let i of clients) {
            i.send(message);
        }
    });

    socket.on('close', function () {
        clients.delete(ws);
    });
});

server.listen(port, () => {
    console.log(`Web run on http://localhost:${port}`);
});
