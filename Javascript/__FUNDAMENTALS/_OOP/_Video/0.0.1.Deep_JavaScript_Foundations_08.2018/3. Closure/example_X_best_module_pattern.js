const Module = (function() {
    const methodCounterGen = (function() {
        let count = 0;
        return function() {
            count += 1;
            return count;
        };
    }());
    const appearenceCounterGen = function() {
        let count = 0;
        return function() {
            count += 1;
            return count;
        };
    };

    const privateMethod = function() {
        const str = 'Hi im private method №';
        return str;
    };
    const publicMethod = function() {
        const methodCount = methodCounterGen();
        const appearenceCountInit = appearenceCounterGen();
        return function() {
            const appearenceCount = appearenceCountInit();
            console.log(privateMethod() + methodCount +
                ' and i am called ' + appearenceCount + ' times!');
        };
    };
    return { publicMethod };
}());

const moduleInstanceOne = Module.publicMethod();
moduleInstanceOne();
moduleInstanceOne();
const moduleInstanceTwo = Module.publicMethod();
moduleInstanceTwo();
moduleInstanceTwo();
moduleInstanceTwo();
moduleInstanceTwo();
moduleInstanceOne();
