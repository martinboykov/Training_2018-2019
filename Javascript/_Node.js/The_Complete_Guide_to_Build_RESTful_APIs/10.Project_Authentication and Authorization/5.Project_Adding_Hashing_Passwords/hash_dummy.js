// Just for testing purpos
// the implementation is in users.js in route folder

const bcrypt = require('bcrypt');

async function run() {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('123456', salt);
    const hashedPassword2 = await bcrypt.hash('abcdef', salt);
    console.log(salt);
    console.log(hashedPassword);
    console.log(hashedPassword2);
}
run();
