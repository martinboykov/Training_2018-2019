function* generator() {
    let n = 0;
    while (true) {
        n += 1;
        console.log(n);
        yield;
    }
}
const gen = generator();
gen.next();
gen.next();
gen.next();

