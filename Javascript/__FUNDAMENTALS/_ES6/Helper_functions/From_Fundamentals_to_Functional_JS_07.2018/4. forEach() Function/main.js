const _ = require('underscore');

function createSuspectObjects(name) {
    return {
        name: name,
        color: name.split(' ')[1],
        speak() {
            console.log(`my name is ${name}`);
        },
    };
}

const suspects = ['Miss Scarlet', 'Colonel Mustard', 'Mr. White'];

const suspectList = [];

_.each(suspects, (suspect) => {
    suspectList.push(createSuspectObjects(suspect));
});
console.log(suspectList);
_.each(suspectList, (suspect) => {
    suspect.speak();
});
