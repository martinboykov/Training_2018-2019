function fakeAjax(url, cb) {
    const fakeResponses = {
        'file1': 'The first text',
        'file2': 'The middle text',
        'file3': 'The last text',
    };
    const randomDelay = (Math.round(Math.random() * 1E2) % 8000) + 1000;

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
    return new Promise(function(resolve) {
        fakeAjax(file, resolve);
    });
}
// const request1 = getFile('file1');
// const request2 = getFile('file2');
// const request3 = getFile('file3');
const url1 = 'file1';
const url2 = 'file2';
const url3 = 'file3';
const list = [
    url1,
    url2,
    url3,
];
const listMapped = list
    .map(function(currentValue, index, array) {
        return getFile(currentValue);
    })
    .reduce(function(all, item, array) {
        all.push(item);
        return all;
    }, []);
Promise.all(listMapped)
    .then(function(arr) {
        arr.forEach(function(text) {
            output(text);
        });
        console.log('Complete!');
    });
