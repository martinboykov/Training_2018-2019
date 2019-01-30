// LOOSE AUGMENTATION MODULE PATTERN

import { MODULE } from './export_file';

// no access to private variables from MODULE
// const privateVariable = 1;

// function privateMethod() {
//     return 'im private method №' + privateVariable;
// }

const MODULE_AUGMENTED = (function(my) {
    my.anotherMethod = function() {
        console.log('added new method №2');
    };
    return my;
}(MODULE || {}));


MODULE.moduleMethod();
MODULE.anotherMethod();
// console.log(MODULE_AUGMENTED);
// console.log(MODULE);
export { MODULE };
