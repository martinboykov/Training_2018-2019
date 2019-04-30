const buffer = new Buffer('Hello!', 'utf8');
console.log(buffer);
console.log(buffer.toString());
console.log(buffer.toJSON());
console.log(buffer[0]);
buffer.write('wo');
console.log(buffer.toString());
