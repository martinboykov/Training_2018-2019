
let _dec, _class, _dec2, _class2;

function superhero(isSuperhero) {
  return function(target) {
    target.isSuperhero = isSuperhero;
  };
}

const MySuperhero = (_dec = superhero(true),
  _dec(_class = class MySuperhero { }) || _class);

console.log(MySuperhero.isSuperhero);

const MySuperheroClass = (_dec2 = superhero(false),
  _dec2(_class2 = class MySuperheroClass { }) || _class2);

console.log(MySuperheroClass.isSuperhero);
