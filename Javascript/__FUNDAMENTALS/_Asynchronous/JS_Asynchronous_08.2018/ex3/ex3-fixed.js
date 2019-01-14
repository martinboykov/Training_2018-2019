function fakeAjax(url, cb) {
    const fakeResponses = {
        'file1': 'The first text',
        'file2': 'The middle text',
        'file3': 'The last text',
    };
    // const randomDelay = (Math.round(Math.random() * 1E4) % 8000) + 1000;

    console.log('Requesting: ' + url);

    setTimeout(function() {
        cb(fakeResponses[url]);
    }, 500);
}

function output(text) {
    console.log(text);
}

// **************************************

function getFile(file) {
    return new Promise(function executor(resolve) {
        fakeAjax(file, resolve);
    });
}

// Request all files at once in
// "parallel" via `getFile(..)`.
const p1 = getFile('file1');
const p2 = getFile('file2');
const p3 = getFile('file3');

// Render as each one finishes,
// but only once previous rendering
// is done.
const start = new Date();
p1
    .then(output)
    .then(function() {
        return p2;
    })
    .then(output)
    .then(function() {
        return p3;
    })
    .then(output)
    .then(function() {
        output('Complete!');
        const finish = new Date();
    console.log(finish - start);
    });
