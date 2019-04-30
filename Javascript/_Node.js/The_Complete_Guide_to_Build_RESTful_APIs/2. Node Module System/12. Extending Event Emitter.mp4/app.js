const { emitter, log } = require('./logger');
// Register a Listener: messageLogged
emitter.on('messageLogged', function(arg) {
    console.log('MessageLogged Listener called', arg);
});

// Reise an event: messageLogged
log('message');
