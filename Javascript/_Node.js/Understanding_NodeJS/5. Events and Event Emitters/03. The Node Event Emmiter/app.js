const Emiter = require('./emmiter');
const emtr = new Emiter();
emtr.on('greet', function() {
    emtr.on('greet', function() {
        console.log('If someone says Hello');
    });
    emtr.on('greet', function() {
        console.log('A greeting occurred');
    });
    console.log('Hello');
    emtr.emit('greet');
});
