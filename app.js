<<<<<<< HEAD
const path = require("path");
const express = require("express");

//#region web server
=======
const path = require('path');
const express = require('express');
const clients = new Set();
>>>>>>> origin/master
const port = process.env.PORT || 80;
const app = express();
const expressWs = require('express-ws')(app);

app.use(express.static(path.join(__dirname, 'public')));

<<<<<<< HEAD
app.get("/", (req, res) => {
    res.sendFile('index.html');
});

app.listen(port, () => {
    console.log(`Web run on http://localhost:${port}`);
});
//#endregion
=======
app.get('/', (req, res) => {
    res.sendFile('/Client/dist/index.html');
});

app.ws('/', (ws, req, res) => {
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

app.listen(port, () => {
    console.log(`Web run on http://localhost:${port}`);
});
>>>>>>> origin/master
