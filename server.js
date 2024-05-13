const express = require("express");
const https = require("https");
const path = require("path");
const fs = require("fs");

const { PORT = 443 } = process.env;
const options = {
  key: fs.readFileSync("./cert/key.pem"),
  cert: fs.readFileSync("./cert/cert.pem"),
};
const server = express();

server
  .use(express.static(path.join(__dirname, "build")))
  .get("/*", function (req, res) {
    res.sendFile(path.join(__dirname, "build", "index.html"));
  });
// .listen(PORT)

https.createServer(options, server).listen(PORT);
