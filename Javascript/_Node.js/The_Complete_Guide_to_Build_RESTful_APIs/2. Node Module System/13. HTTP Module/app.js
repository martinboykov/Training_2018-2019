// const http = require('http');
// const server = http.createServer();
// const port = 3000;
// server.on('connection', function(socket) {
//     console.log('New connection');
// });
// server.listen(port);
// console.log(`Listening on port ${port}`);
const http = require('http');
const port = 3000;
http.createServer(function(req, res) {
    if (req.url === '/') {
        res.write('<h1>This is root url</h1>');
        res.end();
    }
}).listen(port);
console.log(`Listening on port ${port}`);
