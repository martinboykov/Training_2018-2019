const MODULE = (function() {
    const my = {},
        privateVariable = 1;

    function privateMethod() {
        // ...
    }

    my.moduleProperty = 1;
    my.moduleMethod = function() {
       return 'private variable is ' + privateVariable;
    };

    return my;
}());

export { MODULE };
