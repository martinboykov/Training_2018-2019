const fs = require('fs');

const readable = fs.createReadStream(__dirname + '/read.txt',
    { encoding: 'utf8', highWaterMark: 16 * 1024 });
const writable = fs.createWriteStream(__dirname + '/write.txt');
let counter = 0;
readable.on('data', function(chunk) {
    console.log(chunk);
    writable.write(chunk);
    // setTimeout(() => {
    //     console.log(counter);
    //     counter += 1;
    // }, 1000);
    // setTimeout(() => {
    //     // console.log(chunk);
    //     console.log(chunk);
    //     writable.write(chunk);
    // }, 1000);
});
