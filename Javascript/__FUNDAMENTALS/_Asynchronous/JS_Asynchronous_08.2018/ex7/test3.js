
function helper(g) { //helper => calling .next undercovers
    const it = g();
    return function() {
        return it.next(...arguments);
    };
}
const run = helper(function* () {
    const x = 1 + (yield);
    const y = 1 + (yield);
    yield (x + y);
});
console.log(run()); // === run.next();
console.log(run(10));
console.log('Meaning of life: ' + run(30).value);
console.log(run());
