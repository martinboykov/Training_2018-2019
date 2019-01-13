const arr = [1, 2, 3, 4, 5, 6];
const set = new Set(arr);
console.log(set.size);
set.add('string');
const obj = { obj: 'obj' };
set.add({ obj: 'obj' });
set.add(obj);
console.log(set.has({ obj: 'obj' }));
console.log(set.has(obj));
console.log(set.has('string'));
console.log(set.entries());
console.log(set.keys());
console.log(set.values());
set.add(1);
console.log([...set]);
set.forEach((element) => {
    console.log(element);
});

const text = 'India';

const mySet = new Set(text);
console.log([...mySet].join(' '));
