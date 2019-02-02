const fs = require('fs');

const greet = fs.readFileSync(__dirname + '/greet.txt', 'utf8');
console.log(greet);

const greet2 = fs.readFile(__dirname + '/greet.txt', 'utf8',
    function(err, data) {
        if (err) {
            console.log(err);
        } else {
            console.log(err);
            console.log(data);
        }
    });

console.log('Done!');
