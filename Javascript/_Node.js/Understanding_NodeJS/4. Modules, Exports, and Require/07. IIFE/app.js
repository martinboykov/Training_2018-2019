const firstname = 'Jane';
(function(lastname) {
    const firstname = 'John';
    console.log(firstname, lastname);
}('Doe'));

console.log(firstname);
