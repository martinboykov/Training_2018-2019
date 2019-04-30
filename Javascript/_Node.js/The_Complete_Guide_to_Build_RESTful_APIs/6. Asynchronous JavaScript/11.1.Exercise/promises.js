// customer >>> movies >>> send email
console.log('Start');
const db = [
    {
        id: 1, name: 'John', email: 'john@gmail.com',
        movies: ['movie1', 'movie2', 'movie3'],
    },
    {
        id: 2, name: 'Jack', email: 'jack@gmail.com',
        movies: ['movie1', 'movie2', 'movie3'],
    },
    {
        id: 3, name: 'Josh', email: 'josh@gmail.com',
        movies: ['movie1', 'movie2', 'movie3'],
    },
];

// PROMISES
getCustomer(1)
    .then(getMovies)
    .then(sendEmail);


function getCustomer(id) {
    console.log('Getting customer from database...');
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
            // eslint-disable-next-line max-len
            // console.log(`The Data for the customer has loaded: ${JSON.stringify(db[id])}`);
            resolve(db[id]);
        }, 1000);
    });
}
function getMovies(customer) {
    console.log('Getting movies from database...');
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
            // console.log(`The Movies have loaded: ${customer.movies}`);
            resolve(customer);
        }, 2000);
    });
}
function sendEmail(customer) {
    console.log('Sending Email to customer...');
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
            // eslint-disable-next-line max-len
            resolve(console.log(`Email with movies: ${customer.movies} send to customer: ${customer.name} on email: ${customer.email}`));
        }, 3000);
    });
}
console.log('End');
