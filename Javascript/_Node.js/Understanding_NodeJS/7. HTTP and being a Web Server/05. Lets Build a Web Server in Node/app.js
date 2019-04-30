const http = require('http');

http.createServer(function(req, res) { // req-> req. object, res-> stream
    //res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(`<h1>Hello World</h1>`);
}).listen(1338, '127.0.0.1');


