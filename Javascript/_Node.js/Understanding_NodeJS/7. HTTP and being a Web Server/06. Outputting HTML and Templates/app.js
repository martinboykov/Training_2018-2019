const http = require('http');
const fs = require('fs');

http.createServer(function(req, res) { // req-> req. object, res-> stream
    res.writeHead(200, { 'Content-Type': 'text/html' });
    fs.readFile(__dirname + '/index.html', 'utf8', function(err, data) {
        if (err) {
            console.log(err);
        } else {
            console.log('...');
            const message = 'Hello World!';
            res.end(data.replace('{Message}', message));
        }
    });
}).listen(1338, '127.0.0.1');


