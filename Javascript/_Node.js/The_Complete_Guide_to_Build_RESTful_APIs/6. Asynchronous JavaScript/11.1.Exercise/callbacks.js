// customer >>> movies >>> send email

// SYNC
// const customer = getCustomer(id);
// const movies = getMovies(customer);
// sendEmail(customer.email, movies)

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
// ASYNC
// 1.CALLBACK
getCustomer(1, function(customer) {
    getMovies(customer, function(data) {
        sendEmail(data);
        // CALLBACK HELL
    });
});


function getCustomer(id, cb) {
    console.log('Getting customer from database...');
    setTimeout(function() {
        // eslint-disable-next-line max-len
        // console.log(`The Data for the customer has loaded: ${JSON.stringify(db[id])}`);
        return cb(db[id]);
    }, 1000);
}
function getMovies(customer, cb) {
    console.log('Getting movies from database...');
    setTimeout(function() {
        // console.log(`The Movies have loaded: ${customer.movies}`);
        return cb(customer);
    }, 2000);
}
function sendEmail(customer, cb) {
    console.log('Sending Email to customer...');
    setTimeout(function() {
        // eslint-disable-next-line max-len
        console.log(`Email with movies: ${customer.movies} send to customer: ${customer.name} on email: ${customer.email}`);
    }, 3000);
}
console.log('End');

