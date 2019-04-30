import { MODULE } from './export_file';

const MODULE_AUGMENTED = (function(my) {
    my.anotherMethod = function() {
        console.log('added new method');
    };

    return my;
}(MODULE));


MODULE_AUGMENTED.anotherMethod();

export { MODULE_AUGMENTED as MODULE };
