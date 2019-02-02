const http = require('http');
const fs = require('fs');

http.createServer(function(req, res) { // req-> req. object, res-> stream

    if (req.url === '/') {
        fs.createReadStream(__dirname + '/index.html').pipe(res);
        // let dataStream = [];
        // fs.createReadStream(__dirname + '/index.html', 'utf8')
        //     .on('data', (chunk) => {
        //         dataStream.push(chunk);
        //     }).on('end', () => {
        //         res.write(dataStream.toString().replace('{Message}', 'Hello World'));
        //         res.end();
        //     });
    } else if (req.url === '/api') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        const obj = {
            firstname: 'John',
            secondname: 'Doe',
        };
        res.write(JSON.stringify(obj));
        res.end();
    } else {
        res.writeHead(404);
        res.end();
    }
}).listen(1338, '127.0.0.1');


