// TIGHT AUGMENTATION MODULE PATTERN

import { MODULE } from './export_file';

// no access to private variables from MODULE
// const privateVariable = 1;

// function privateMethod() {
//     return 'im private method №' + privateVariable;
// }


const MODULE_AUGMENTED = (function(my) {
    const oldModuleMethod = my.moduleMethod;
    my.moduleMethod = function() {
        console.log('added new moduleMethod');
    };
    return my;
}(MODULE || {}));


MODULE.moduleMethod();
// MODULE.anotherMethod();
// console.log(MODULE_AUGMENTED);
// console.log(MODULE);
export { MODULE };
