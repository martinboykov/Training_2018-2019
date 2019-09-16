// https://dev.to/tomekbuszewski/singleton-in-javascript-1d5i

// using method instance in the Class

class Singleton {
  constructor(name = '') {
    if (!!Singleton.instance) {
      console.log('Singleton instance already exists');
      return Singleton.instance;
    }
    console.log('Singleton instance initiated');
    Singleton.instance = this;
    this.name = name;

    return this;
  }
}

const instance1 = new Singleton('First Instance');
const instance2 = new Singleton('Second Instance');
const instance3 = new Singleton();
const instance4 = new Singleton();
console.log(instance1);
console.log(instance2);
console.log(instance3);
console.log(instance4);
