const game = {
    'suspects': [
        {
            name: 'Rusty',
            color: 'orange',
        },
        {
            name: 'Ms Scarlet',
            color: 'red',
        },
    ],
};
// console.log(game['suspects']);
game.suspects.forEach((object) => {
    for (const key in object) {
        if (object.hasOwnProperty(key)) {
            console.log(key, ': ', object[key]);
        }
    }
    // console.log(element);
});

const { a, b } = { a: game.suspects[0].color, b: game.suspects[1].color };
console.log(a, b);
