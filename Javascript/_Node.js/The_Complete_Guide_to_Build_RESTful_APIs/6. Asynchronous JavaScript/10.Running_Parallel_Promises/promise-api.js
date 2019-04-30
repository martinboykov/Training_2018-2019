const p1 = new Promise(function(resolve, reject) {
    setTimeout(function() {
        console.log('Async operration 1...');
        resolve(1);
        // reject(new Error('Becouse something failed!'))
    }, 1000);
});
const p2 = new Promise(function(resolve) {
    setTimeout(function() {
        console.log('Async operration 2...');
        resolve(2);
    }, 2000);
});


Promise.all([p1, p2])
    .then(function(result) {
        console.log(result);
    })
    .catch(function(error) {
        console.log('Error', error.message);
        // if one Promise is rejected entire Promise.all object is rejected
    });


// If we want to work with result as soon as
// the first async operation is complete
Promise.race([p1, p2])
    .then(function(result) {
        // Here we get ONLY the value of the first resolved promise
        console.log(result);
    })
    .catch(function(error) {
        console.log('Error', error.message);
        // if one Promise is rejected ENTIRE Promise.all object is rejected
    });
