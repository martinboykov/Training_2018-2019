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
    return ASQ(function(done) {
        fakeAjax(file, done);
    });
}

// Request all files at once in
// "parallel" via `getFile(..)`.
//
// Render as each one finishes,
// but only once previous rendering
// is done.

// ???
