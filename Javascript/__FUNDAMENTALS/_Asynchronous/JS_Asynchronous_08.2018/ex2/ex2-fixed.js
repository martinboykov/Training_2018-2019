function fakeAjax(url, callBack) {
    const fakeResponse = {
        'file1': 'The first text',
        'file2': 'The middle text',
        'file3': 'The last text',
    };
    const randomDelay = (Math.round(Math.random() * 1E3) % 8000) + 1000;

    console.log('Requesting: ' + url);

    setTimeout(function() {
        callBack(fakeResponse[url]);
    }, randomDelay);
}

function output(text) {
    console.log(text);
}

// **************************************

function getFile(file) {
    let resp;

    fakeAjax(file, function(response) {
        if (!resp) {
            resp = response;
        } else resp(response);
    });

    return function thunk(callBack) { //look below at thunks 1,2 and 3
        if (resp) {
            callBack(resp);
        } else resp = callBack;
    };
}

// request all files at once in "parallel"
const thunk1 = getFile('file1');
const thunk2 = getFile('file2');
const thunk3 = getFile('file3');


// nested Callbacks ---> look return of getFile
thunk1(ready1);
function ready1(text) {
    output(text);
    thunk2(ready2);
}
function ready2(text) {
    output(text);
    thunk3(ready3);
}
function ready3(text) {
    output(text);
    output('Complete!');
}


