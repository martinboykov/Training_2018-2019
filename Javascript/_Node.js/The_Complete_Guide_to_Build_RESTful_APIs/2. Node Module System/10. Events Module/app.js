const EventEmitter = require('events');

const emitter = new EventEmitter();
// Register a Listener
emitter.on('messageLogged', () => console.log('Listener called'));
// Reise an event
// emitter.emit('messageLogged');
console.log(emitter.emit('messageLogged'));
