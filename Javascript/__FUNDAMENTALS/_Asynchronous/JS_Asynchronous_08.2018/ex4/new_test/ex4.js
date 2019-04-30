function fakeAjax(url, cb) {
    const fakeResponses = {
        'file1': 'The file1 text',
        'file2': 'The file2 text',
        'file3': 'The file3 text',
    };
    const randomDelay = (Math.round(Math.random() * 1E3) % 8000) + 1000;

    console.log('Requesting: ' + url);

    setTimeout(function() {
        cb(fakeResponses[url]);
    }, randomDelay);
}

function output(text) {
    console.log(text);
}

// **************************************
// The old-n-busted callback way

function getFile(file) {
    return new Promise(function(resolve) {
        fakeAjax(file, resolve);
    });
}
const array = ['file1', 'file2', 'file3'];

console.log(
    `***************************************
| CONCURRENT START WITH PROMISE.ALL |
***************************************`);
Promise.all(array
    .map((file) => {
        return getFile(file);
    })
    .reduce(function(accumulator, currentValue, currentIndex) {
        accumulator.push(currentValue);
        return accumulator;
    }, []))
    .then((values) => values
        .forEach((element) => {
            console.log(element);
        }))
    .catch((reason) => {
        console.log(reason);
    });

setTimeout(function() {
    console.log(
        `***************************************
| CONCURRENT START WITH PROMISE.THEN |
***************************************`);
    array.map((file) => getFile(file))
        .reduce(function combine(chain, pr) {
            return chain.then(function() {
                return pr;
            }).then((result) => output(result));
        }, Promise.resolve());
}, 2000);

setTimeout(function() {
    console.log(
        `***************************************
| PARALLEL START WITH PROMISE.THEN |
***************************************`);
    array.map((file) => getFile(file))
        .forEach((promise)=>{
            promise.then((result) => output(result));
        });
}, 4000);
// Request all files at once inFf
// "parallel" via `getFile(..)`.
//
// Render as each one finishes,
// but only once previous rendering
// is done.

// ???
