const foo = 'bar';
console.log(foo);

function bar() {
    const foo = 'baz';
    console.log(foo);
}

function baz(foo) {
    foo = 'bam';
    console.log(foo);
    bam = 'yay';
    console.log(bam);
}

bar();
baz(foo);
console.log(foo);
