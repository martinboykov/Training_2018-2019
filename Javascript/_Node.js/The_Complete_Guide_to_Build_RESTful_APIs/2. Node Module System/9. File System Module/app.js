const fs = require('fs');
const files = fs.readdirSync('./');
console.log(files);
const filesAsync = fs.readdir('D:\\Programing\\Video_Tutorials\\_MY_TRAINING\\Javascript\\_Node.js\\The Complete Guide to Build RESTful APIs_2018\\9. File System Module', function(err, data) {
    if (err) {
        console.log('Error', err);
    } else {
        console.log('Result', data);
    }
});
