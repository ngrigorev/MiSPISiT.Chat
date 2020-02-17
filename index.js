// let express = require("express");
// let app = express();
// app.get("/", function (request, response){
// response.send(request.query);
// })
// app.listen(591);

let wss = require("ws").Server;
let server = new wss({port:591});
let clients = new Set();
server.on("connection", function(socket){
    clients.add(socket);
    socket.on("message", function(message){
        for (let i of clients){
            i.send(message);
        }
    });
    socket.on("close", function(){
        clients.delete(socket);
    });
});