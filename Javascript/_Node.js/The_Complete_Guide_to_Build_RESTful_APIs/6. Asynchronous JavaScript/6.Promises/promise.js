const db = [
    { subject1: { name: 'Bob', id: 1 } },
    { subject2: { name: 'Josh', id: 2 } },
    { subject3: { name: 'Ann', id: 3 } },
];

const p = new Promise(function(resolve, reject) {
    // Kick off some async work
    // ...

    // return value or error
    setTimeout(function() {
        resolve(db[0]);
        reject(new Error('This is the Error message!'));
    }, 500);
});

p.then(function(result) {
    console.log('Result', result);
}).catch(function(error) {
    console.log('Error', error.message);
});

module.exports = p;
