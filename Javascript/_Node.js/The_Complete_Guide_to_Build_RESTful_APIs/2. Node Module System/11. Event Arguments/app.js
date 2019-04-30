const EventEmitter = require('events');

const emitter = new EventEmitter();
// Register a Listener: messageLogged
emitter.on('messageLogged', function(arg) {
    console.log('MessageLogged Listener called', arg);
});
// Register a Listener: logging
emitter.on('logging', function(arg) {
    console.log('Logging Listener called', arg);
});
// Reise an event: messageLogged
// emitter.emit('messageLogged');
emitter.emit('messageLogged', { id: 1, url: 'url' });
// Reise an event: Logging
emitter.emit('logging', { data: { id: 1, path: __dirname } });
