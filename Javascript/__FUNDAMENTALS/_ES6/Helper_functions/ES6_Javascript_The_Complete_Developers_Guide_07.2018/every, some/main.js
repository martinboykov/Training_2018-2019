const computers = [
    { name: 'Apple', ram: 24 },
    { name: 'Compaq', ram: 4 },
    { name: 'Acer', ram: 32 },
];

const computerWithSpecificSpec = computers.some((computer, index, thisArg) => {
    return computer.ram >= 20;
});
console.log(computerWithSpecificSpec);
const computerWithoutSpecificSpec = computers.every(
    (computer, index, thisArg) => {
        return computer.ram >= 20;
    });
console.log(computerWithoutSpecificSpec);
