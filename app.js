const path = require("path");
const ws = require("ws").Server;
const express = require("express");

//#region web server
const app = express();

app.use(express.static(path.join(__dirname, 'Client/dist')));

app.get("/", (req, res) => {
    res.sendFile('/Client/dist/index.html');
})
app.listen(80, () => {
    console.log('Web run on http://localhost');
});
//#endregion

//#region ws server
const server = new ws({ port: 500 }, () => {
    console.log('WebSocket server run on ws://localhost:500');
});

const clients = new Set();

server.on("connection", function (socket) {
    clients.add(socket);

    socket.on("message", function (message) {
        for (let i of clients) {
            i.send(message);
        }
    });

    socket.on("close", function () {
        clients.delete(socket);
    });
});
//#endregion