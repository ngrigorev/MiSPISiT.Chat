// lesson 2 - begin:
// let express = require("express");
// let app = express();
// app.get("/", function (request, response){
// response.send("Hello!");
// })
// app.listen(591);

//lesson 2 - continue:
let wss = require("ws").Server;
let server = new wss({port:591});
let clients = new Set();
server.on("connection", function(socket){
    clients.add(socket);
    socket.on("message", function(message){
        //lesson 4 - begin
        // console.log(message);
        // if (message == "TestConnect") return;
        //lesson 4 - end
        for (let i of clients){
            i.send(message);
        }
    });
    socket.on("close", function(){
        clients.delete(socket);
    });
});


let express = require("express");
let app = express();
app.use(express.static(__dirname));
app.get("/", function (request, response){
response.sendFile('index.html');
})
app.listen(80);