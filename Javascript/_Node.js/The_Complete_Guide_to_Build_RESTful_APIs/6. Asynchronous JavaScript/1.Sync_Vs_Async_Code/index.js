console.log('Before');
const user = function(a) {
    return getUser();
};

console.log('After');


function getUser(id) {
    setTimeout(function() {
        console.log('Reading a user from db');
        return { id: id, githubUserName: 'mosh' };
    }, 1000);
}
