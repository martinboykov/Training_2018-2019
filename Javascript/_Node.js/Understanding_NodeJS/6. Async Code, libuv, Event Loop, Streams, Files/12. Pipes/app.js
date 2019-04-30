const fs = require('fs');
const zlib = require('zlib'); // zip file in node (global object)

const readable = fs.createReadStream(__dirname + '/read.txt');
const writable = fs.createWriteStream(__dirname + '/write.txt');
const gzip = zlib.createGzip(); // create compressing stream
const compressed = fs.createWriteStream(__dirname + '/write.txt.gz');


readable.pipe(writable);

readable.pipe(gzip).pipe(compressed); // (read) . (compress) . (write)
