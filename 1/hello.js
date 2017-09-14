const http = require('http');

const hostname = '0.0.0.0';
const port = 3000;

function handleRequest(req, res) {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    res.end("Hello World");
}

const server = http.createServer(handleRequest);

console.log("Listening on :" + port);
server.listen(port, hostname);
