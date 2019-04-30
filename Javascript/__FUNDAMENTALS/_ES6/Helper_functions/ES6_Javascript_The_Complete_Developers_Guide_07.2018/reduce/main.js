// const numbers = [10, 20, 30];
// const sum = numbers.reduce((accumulator, currentValue, currentIndex, array) => {
//     console.log(accumulator, currentValue, currentIndex, array);
//     return accumulator + currentValue;
// }, 5);
// console.log(sum);

// -------------------------------------

// const primaryColors = [
//     { color: 'red' },
//     { color: 'yellow' },
//     { color: 'blue' },
// ];

// const colors = primaryColors.reduce(
//     (accumulator, currentValue, index, array) => {
//         // The return value of Array#push is the new length
//         // of the array after the push.
//         // This means that in the second iteration acc is a number,
//         // which doesn't have the push method.
//         accumulator.push(currentValue.color);
//         return accumulator;
//         // return accumulator.concat(currentValue.color);
//     }, []);
// console.log(colors);

// -----------------------------------
// ( - 40
// ) - 41
const stringToCheck = '((asdas(dasad))';
function checkIfCorrectBraces(str) {
    const result = Array.prototype.reduce.call(str, function(accumulator, currentValue) {
        let currentNumber = currentValue.charCodeAt(0);
        // console.log(!Number(accumulator));
        if (accumulator < 0) {
            return 'error';
        }
        if (currentNumber === 41) {
            currentNumber = -40;
            accumulator += currentNumber;
        } else if (currentNumber === 40) {
            accumulator += currentNumber;
        }
        // console.log(accumulator);

        return accumulator;
    }, 0);
    if (result === 0) {
        console.log('correct statement');
    } else {
        console.log('incorrect statement');
    }
}

checkIfCorrectBraces(stringToCheck);

