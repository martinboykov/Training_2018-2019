const _ = require('underscore');

const weapons = ['candelstick', 'lead-pipi', 'revolver'];
const makeBroken = function(item) {
    return `broken ${item}`;
};
// _.map(weapons, function(weapon) {
//     brokenWeapons.push(makeBroken(weapon));
// });
// _.each(brokenWeapons, (brokenWeapon) => {
//     console.log(brokenWeapon);
// });
const brokenWeapons = weapons.map((weapon) => {
    return (makeBroken(weapon));
});

brokenWeapons.forEach((brokenWeapon) => {
    console.log(brokenWeapon);
});
