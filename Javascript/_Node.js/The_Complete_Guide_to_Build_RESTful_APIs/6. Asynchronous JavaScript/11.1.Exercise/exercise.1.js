// https://javascript.info/async-await
// TASKS

const db = [
    {
        url: 'no-such-user.json',
        json: '{"text": "user1"}'
    },
    {
        url: '2',
        json: {
            "text": "user2"
        },
    },
    {
        url: '3',
        json: {
            "text": "user3"
        },
    },
];
function fetch(url) {
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
            const index = db.findIndex(function(el) {
                return el.url === url;
            });
            console.log(index);
            if (index < 0) {
                reject(new Error('no such url'));
            } else {
                resolve(db[index].json);
            }
        }, 1000);
    });
}

async function loadJson(url) {
    try {
        const response = await fetch(url);
        const user = await JSON.parse(response);
        return user;
    } catch (error) {
        console.log(error.message);
    }
    return;
}

loadJson('no-such-user.json');

