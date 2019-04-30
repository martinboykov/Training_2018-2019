// an input JSON string
const jstr = '{"mykey": "my value"}';
// // antipattern
// var data = eval('(' + jstr + ')');
// preferred
const data = JSON.parse(jstr);
console.log(data.mykey); // "my value"

const dog = {
    name: 'Fido',
    dob: new Date(),
    legs: [1, 2, 3, 4],
};
let jsonstr = JSON.stringify(dog);
// jsonstr is now:
// {"name":"Fido","dob":"2010-04-11T22:36:22.436Z","legs":[1,2,3,4]}
console.log(jsonstr);

const a = [1, 2];
jsonstr = JSON.stringify(a);
console.log(jsonstr);
