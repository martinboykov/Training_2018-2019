function fakeAjax(url, cb) {
    const fakeResponses = {
        'file1': 'The first text',
        'file2': 'The middle text',
        'file3': 'The last text',
    };
    const randomDelay = (Math.round(Math.random() * 1E4) % 8000) + 1000;

    console.log('Requesting: ' + url);

    setTimeout(function() {
        cb(fakeResponses[url]);
    }, randomDelay);
}

function output(text) {
    console.log(text);
}

// **************************************

function getFile(file) {
    return new Promise(function(resolve, reject) {
        fakeAjax(file, resolve);
    });
}
const request1 = getFile('file1');
const request2 = getFile('file2');
const request3 = getFile('file3');


getFile('file1')
    .then(function(text) {
        output(text);
        return getFile('file2');
    })
    .then(function(text) {
        output(text);
        return getFile('file3');
    })
    .then(function(text) {
        output(text);
        console.log('Complete!');
    });
