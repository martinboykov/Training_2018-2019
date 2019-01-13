// const colors = ['red', 'blue', 'green'];
// colors.forEach((color, index, thisA) => {
//     console.log(color, index, thisA);
// });


const numbers = [1, 2, 3, 4, 5];
let sum = 0;
numbers.forEach((number) => {
    adder(number);
});
console.log(sum);
function adder(number) {
    sum += number;
}
