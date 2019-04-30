// // Explicit
function greet() {
    console.log(`${this.animal} typically sleep between ${this.sleepDuration}`);
}
// 2. function called by CALL() or APPLY()
const obj = {
    animal: 'cats', sleepDuration: '12 and 16 hours',
};
greet.call(obj);

// 3. function called on a CONTEXT OBJECT
// const obj = {
//     animal: 'cats', sleepDuration: '12 and 16 hours', greet: greet,
// };
// obj.greet();

// 4. DEFAULT: global object (except strict mode)
// animal = 'cats';
// sleepDuration = '12 and 16 hours';
// greet();


