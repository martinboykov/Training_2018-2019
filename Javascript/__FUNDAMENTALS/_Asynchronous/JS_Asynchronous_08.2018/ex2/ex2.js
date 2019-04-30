function fakeAjax(url, cb) {
    const fake_responses = {
        'file1': 'The first text',
        'file2': 'The middle text',
        'file3': 'The last text',
    };
    const randomDelay = (Math.round(Math.random() * 1E4) % 8000) + 1000;

    console.log('Requesting: ' + url);

    setTimeout(function() {
        cb(fake_responses[url]);
    }, randomDelay);
}

function output(text) {
    console.log(text);
}

// **************************************
const arr = ['file1', 'file2', 'file3'];
const arrResult = [];

function getFile(file) {
    const time = 0;
    let bool1 = true;
    let bool2 = true;
    let bool3 = true;
    file.forEach(function(call) {
        fakeAjax(call, function(text) {
            // what do we do here? => callback
            if (text === 'The first text') {
                arrResult[0] = (text);
            } else if (text === 'The middle text') {
                arrResult[1] = (text);
            } else if (text === 'The last text') {
                arrResult[2] = (text);
            }
            if (arrResult[0] && bool1) {
                console.log(arrResult[0]);
                bool1 = false;
            }
            if (arrResult[0] && arrResult[1] && bool2) {
                console.log(arrResult[1]);
                bool2 = false;
            }
            if (arrResult[0] && arrResult[1] && arrResult[2] && bool3) {
                console.log(arrResult[2]);
                console.log('Complete');
                bool3 = false;
            }
        });
    });
}
getFile(arr);
