const buffer = new ArrayBuffer(8);
const view = new Int32Array(buffer);
console.log(buffer);
view[0] = 1;
view[1] = 2;
console.log(view);
