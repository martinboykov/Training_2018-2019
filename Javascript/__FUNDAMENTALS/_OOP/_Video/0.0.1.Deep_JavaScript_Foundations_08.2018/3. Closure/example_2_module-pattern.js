const foo = (function() {
    const publicAPI = {
        bar() {
            publicAPI.baz();
        },
        baz() {
            console.log('baz');
        },
    };
    return {
        publicAPI,
    };
}());

foo.publicAPI.bar();
