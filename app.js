const ws = require("ws");
const server = new ws.Server({
    port: 591
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


// let express = require("express");
// let app = express();
// app.use(express.static(__dirname));
// app.get("/", function (request, response){
// response.sendFile('index.html');
// })
// app.listen(80);