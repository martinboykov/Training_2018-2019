const http = require('http');
const fs = require('fs');

http.createServer(function(req, res) { // req-> req. object, res-> stream
    res.writeHead(200, { 'Content-Type': 'text/html' });
    // fs.createReadStream(__dirname + '/index.html').pipe(res); // piping the entire stream

   // if we need to manipulate the data in the stream =>
    const dataStream = [];
    fs.createReadStream(__dirname + '/index.html', 'utf8')
        .on('data', (chunk) => {
            dataStream.push(chunk);
        }).on('end', () => {
            res.write(dataStream.toString().replace('{Message}', 'Hello World'));
            res.end();
        });
    //  .on('data', function(chunk) {
    //  console.log(chunk);
    //  res.end(chunk);
    //  });
}).listen(1338, '127.0.0.1');


