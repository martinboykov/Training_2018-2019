// TIGHT AUGMENTATION MODULE PATTERN

const MODULE = (function() {
    const my = {},
        privateVariable = 1;

    function privateMethod() {
        return 'im private method №' + privateVariable;
    }

    my.moduleProperty = 1;
    my.moduleMethod = function() {
        console.log('module method №1: private says ' + privateMethod());
    };
    // my.accessToPrivet = (function() {
    //     return { privateMethod, privateVariable };
    // }());

    return my;
}());

export { MODULE };
