const ws = require("ws").Server;

//#region ws server
const port = process.env.PORT || 500;

const server = new ws({ port }, () => {
    console.log(`WebSocket server run on ws://localhost:${port}`);
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