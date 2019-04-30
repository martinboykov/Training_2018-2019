const Emitter = require('events');
const emtr = new Emitter();
const eventConfig = require('./config').events;
// In order not to use magic strings, so less mistakes

emtr.once(eventConfig.GREET, function(){
    console.log('If someone says Hello once');
});
emtr.on(eventConfig.GREET, function(){
    console.log('If someone says Hello multiple times');
});
emtr.addListener(eventConfig.GREET, function(){
    console.log('A greeting occurred every time');
});

console.log('Hello');
emtr.emit('greet');
emtr.emit('greet');
