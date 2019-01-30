class Foo {
    constructor(who) {
        this.xxx = 'xxx';
        this.me = who;
    }
    identify() {
        return 'I am ' + this.me;
    }
    static hello() {
        // constructor inheritance!!!
        console.log('Hello, i\'m static method');
    }
}
Foo.prototype.xxxx = 'newXXXX';
const a1 = new Foo('a1');
const a2 = new Foo('a2');
console.log(a1.identify());
console.log(a2.identify());
class Bar extends Foo {
    identify() {
        console.log('Hello, ' + super.identify() + '.');
    }
}
const b1 = new Bar('b1');
const b2 = new Bar('b2');
b1.identify();
b2.identify();


// Foo.hello();
// Bar.hello();
// console.log();
// console.log(Foo);
// console.log(Foo.prototype);
// console.log(Foo.constructor);
// console.log(Foo.constructor.prototype);
// console.log();
// console.log(Bar);
// console.log(Bar.prototype);
// console.log(Bar.constructor);
// console.log(Bar.constructor.prototype);
// console.log();
// console.log(b1);
// console.log(b1.constructor);
// console.log(b1.constructor.prototype);
// console.log();
// console.log(Object.getPrototypeOf(b1));
// console.log(b1 instanceof Object);
// console.log(b1 instanceof Foo);
// console.log(b1 instanceof Bar);
// console.log();

// console.log();
// C:\Users\twrkh>npm list -g --depth=0
// C:\Users\twrkh\AppData\Roaming\npm
// +-- @angular/cli@1.3.2
// +-- @compodoc/compodoc@1.0.0-beta.13
// +-- axios@0.16.1
// +-- babel-eslint@7.2.3
// +-- UNMET PEER DEPENDENCY babel-register@*
// +-- bower@1.8.0
// +-- browser-sync@2.18.13
// +-- copy@0.3.0
// +-- dependo@0.1.6
// +-- eslint@4.3.0
// +-- eslint-config-google@0.9.1
// +-- firebase-tools@3.13.1
// +-- gulp-cli@1.3.0
// +-- http-server@0.9.0
// +-- istanbul@0.4.5
// +-- jshint@2.9.5
// +-- jslint@0.12.0
// +-- live@0.1.23
// +-- live-server@1.2.0
// +-- madge@2.0.0
// +-- mongodb@2.2.30
// +-- node-wget@0.4.2
// +-- nodemon@1.11.0
// +-- npm@5.4.2
// +-- npm-windows-upgrade@4.0.1
// +-- pad-left@2.1.0
// +-- pad-right@0.2.2
// +-- protractor@5.1.2
// +-- server@1.0.0-alpha.21
// +-- touchx@0.0.3
// +-- ts-node@3.3.0
// +-- tslint@5.6.0
// +-- typescript@2.5.2
// +-- typescript-formatter@6.0.0
// +-- wget@0.0.1
// +-- yarn@0.27.5
// `-- yo@2.0.0
