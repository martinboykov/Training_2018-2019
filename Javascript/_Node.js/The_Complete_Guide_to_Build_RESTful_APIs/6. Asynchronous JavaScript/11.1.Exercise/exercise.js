const fetch = require('node-fetch');

class HttpError extends Error {
    constructor(response) {
        super(`${response.status} for ${response.url}`);
        this.name = 'HttpError';
        this.response = response;
    }
}

async function loadJson(url) {
    const response = await fetch(url);
    if (response.status === 200) {
        return response.json();
    }
    throw new HttpError(response);
}

// Ask for a user name until github returns a valid user
async function demoGithubUser(name) {
    let user;
    try {
        console.log(`https://api.github.com/users/${name}`);
        user = await loadJson(`https://api.github.com/users/${name}`);
        console.log(`Full name: ${user.login}`);
    } catch (err) {
        if (err instanceof HttpError && err.response.status === 404) {
            // loop continues after the alert
            console.log('No such user, please reenter.');
        } else {
            // unknown error, rethrow
            throw err;
        }
    }
    return user;
}

demoGithubUser('martinboykov');
