function* gen() {
    console.error('Hello');
    let n = 1;
    while (n < 10) {
        console.log(n);
        yield;
        n += 1;
    }

    console.log('World');
    console.log('Still running.....');
}
const it = gen();
it.next();

