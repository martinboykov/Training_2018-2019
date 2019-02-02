const http = require('http');
const fs = require('fs');

http.createServer(function(req, res) { // req-> req. object, res-> stream
    res.writeHead(200, { 'Content-Type': 'application/json' });
    // fs.readFile(__dirname + '/index.json', 'utf8',  function(err, data) {
    //     if (err) {
    //         console.log(err);
    //     } else {
    //         console.log('...');
    //         console.log(data);
    //         console.log(JSON.parse(data));
    //         res.end(JSON.parse(data).msg);
    //     }
    // });

    const obj = {
        firstname: 'John',
        secondname: 'Doe',
    };
    res.write(JSON.stringify(obj));
    res.end();

}).listen(1338, '127.0.0.1');


