const path = require("path");
const express = require("express");

//#region web server
const port = process.env.PORT || 80;
const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.get("/", (req, res) => {
    res.sendFile('index.html');
});

app.listen(port, () => {
    console.log(`Web run on http://localhost:${port}`);
});
//#endregion
