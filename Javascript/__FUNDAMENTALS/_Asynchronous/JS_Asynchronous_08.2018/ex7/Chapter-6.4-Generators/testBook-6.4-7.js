function fakeAjax(url, calback) {
    const fakeResponses = {
        'url': 'The first url',
        'dot': '.',
    };
    const randomDelay = (Math.round(Math.random() * 1E2) % 8000) + 1000;

    console.log('Requesting: ' + url);

    setTimeout(function() {
        calback(fakeResponses[url]);
    }, randomDelay);
}
function foo(url) {
    return fakeAjax(url, function(err, data) {
        if (err) {
            // throw an error into `*main()`
            it.throw(err);
        } else {
            // resume `*main()` with received `data`
            it.next(data);
        }
    }
    );
}

function* main() {
    try {
        const text = yield foo('url');
        console.log(text);
    } catch (err) {
        console.error(err);
    }
}

const it = main();
// start it all up!
it.next();

