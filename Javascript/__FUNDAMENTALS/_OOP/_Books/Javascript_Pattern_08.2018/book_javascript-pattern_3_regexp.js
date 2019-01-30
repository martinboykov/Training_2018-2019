// regular expression literal
let re = /\\/gm;

// constructor
re = new RegExp('\\\\', 'gm');

var no_letters = "abc123XYZ".replace(/[a-z]/gi, "");
console.log(no_letters); // 123

// Return a memoized version of f.
// It only works if arguments to f all have distinct string representations.
