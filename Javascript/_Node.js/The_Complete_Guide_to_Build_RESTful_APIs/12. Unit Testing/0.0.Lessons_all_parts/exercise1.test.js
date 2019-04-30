const exercise1 = require('./exercise1');

describe('fizzBuzz', () => {
    const numberArr = (function() {
        const foo = [];
        for (let i = 1; i <= 25; i += 1) {
            foo.push(i);
        }
        return foo;
    }());
    const inputArr = [null, undefined, NaN, '', true, false, 'sadasd', Symbol('foo'), ...numberArr];
    inputArr.forEach((input) => {
        it('if input type is NOT a number, throw an Error', () => {
            if (typeof input !== 'number') {
                expect(() => exercise1.fizzBuzz(input)).toThrow();
            }
            // const nonNumberArr = [null, undefined, NaN, false, true, ''];
            // nonNumberArr.forEach((nonNumber) => {
            //     expect(() => exercise1.fizzBuzz(nonNumber).toThrow());
            // });
            if (typeof input === 'number') expect(() => exercise1.fizzBuzz(input).toThrow());
        });
        it('if input % 3 === 0 && input % 5 === 0 to return FizzBuzz', () => {
            if (typeof input === 'number' && (input % 3 === 0) && (input % 5) === 0) {
                expect(exercise1.fizzBuzz(input)).toBe('FizzBuzz');
            }

            // const isNumber = true;

            // const result = arr.filter((el) => ((el % 3) === 0) && ((el % 5) === 0));
            // if (result) {
            //     result.forEach((r) => {
            //         expect(function() {
            //             return exercise1.fizzBuzz(r);
            //         }).toBe('FizzBuzz');
            //     });
            // }
        });
        it('if input % 3 === 0 to return Fizz', () => {
            if (typeof input === 'number' && (input % 3 === 0) && (input % 5 !== 0)) {
                expect(exercise1.fizzBuzz(input)).toBe('Fizz');
            }
            // const result = arr.filter((el) => ((el % 3) === 0));
            // if (result) {
            //     result.forEach((r) => {
            //         expect(function() {
            //             return exercise1.fizzBuzz(r);
            //         }).toBe('Fizz');
            //     });
            // }
        });
        it('if input % 5 === 0 to return Buzz', () => {
            if (typeof input === 'number' && (input % 5 === 0) && (input % 3 !== 0)) {
                expect(exercise1.fizzBuzz(input)).toBe('Buzz');
            }
            // const result = arr.filter((el) => ((el % 5) === 0));
            // if (result) {
            //     result.forEach((r) => {
            //         expect(function() {
            //             return exercise1.fizzBuzz(r);
            //         }).toBe('Buzz');
            //     });
            // }
        });
        it('if input is number', () => {
            if (typeof input === 'number' && (input % 5 !== 0) && (input % 3 !== 0)) {
                expect(exercise1.fizzBuzz(input)).toBe(input);
            }
            // const result = arr.filter((el) => ((el % 5) === 0));
            // if (result) {
            //     result.forEach((r) => {
            //         expect(function() {
            //             return exercise1.fizzBuzz(r);
            //         }).toBe('Buzz');
            //     });
            // }
        });
    });
});
