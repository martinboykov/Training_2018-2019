// Creating promise that is already resolved
// usefull when unit testing

// success
// const p = Promise.resolve({ id: 1 });
// p.then(function(result) {
//     console.log('Result', result);
// });

// error
// always use Error object when rejecting Promises
const p = Promise.reject(new Error('reason for rejection...'));
p.then(function(error) {
    console.log('Error', error.message);
});
