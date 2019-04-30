const EventEmitter = require('events');
const emitter = new EventEmitter();

const url = 'http://mylogger.io/log';

function log(message) {
    // send a HTTP request
    console.log(message);

    emitter.emit('messageLogged', { id: 1, url: 'url' });
}

// module.exports.log = log;
// module.exports.url = url;
module.exports = { log, emitter };
