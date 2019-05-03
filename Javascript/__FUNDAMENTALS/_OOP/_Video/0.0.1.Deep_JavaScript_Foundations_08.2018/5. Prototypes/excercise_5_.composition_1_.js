
const barker =
    function(state) { // parameter is object
        return {
            bark: function() {
                console.log('Woof, I am ' + state.name);
            },
        };
    };
const driver =
    function(state) { // parameter is object
        return {
            drive: function() {
                state.position = state.position + state.speed;
                console.log(state.position);
            },
        };
    };
const barker1 = barker({ name: 'karo' });
barker1.bark();


const murderRobotDog =
    function(name) {
        const state = {
            name: name,
            speed: 100,
            position: 0,
        };
        return Object.assign(
            barker(state),
            driver(state)
        );
    };
const murderRobotDog1 = murderRobotDog('sniffles');
murderRobotDog1.bark();
murderRobotDog1.drive();
console.log(murderRobotDog1);


