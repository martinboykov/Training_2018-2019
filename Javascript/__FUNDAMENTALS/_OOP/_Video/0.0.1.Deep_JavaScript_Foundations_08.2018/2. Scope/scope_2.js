const foo = 'bar';


function bar() {

    const foo = 'baz';

    function baz(foo) {
        foo = 'bam';
        bam = 'yay';
        console.log(foo);
        console.log(bam);
    }
    baz();
    console.log(foo);
}


bar();
foo;
console.log(foo);
bam;
console.log(bam);
// baz();

