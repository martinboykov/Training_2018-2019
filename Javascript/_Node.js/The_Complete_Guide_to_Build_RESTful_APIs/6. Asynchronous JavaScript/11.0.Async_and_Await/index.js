
// Async
console.log('Before');

// USING CALLBACKS
// --------------------------------------------------
// getUser(1, function(user) {
//     // console.log('User:', user);
//     getRepositories(user, function(repos) {
//         // console.log('Repos', repos);
//         const repo = repos[0];
//         getCommits(repo, function(commits) {
//             console.log('Commits', commits);
//             // CALLBACK HELL
//         });
//     });
// });

// USING PROMISES
// --------------------------------------------------
// const user = getUser(1);
// const repositories = user.then(getRepositories);
// const commits = repositories.then(getCommits);
// getUser(1)
//     .then(getRepositories)
//     .then(getCommits)
//     .catch(function(err) {
//         console.log('Error', err.message);
//     });


// USING ASYNC & AWAIT
// --------------------------------------------------
async function displayCommits() {
    try {
        const user = await getUser(1);
        const repos = await getRepositories(user);
        const commits = await (getCommits(repos[0]));
        console.log(commits);
    } catch (error) {
        console.log('Error:', error.message);
    }
}

displayCommits();

console.log('After');

function getUser(id) {
    return new Promise(function(resolve, reject) {
        // Kick off some async work
        setTimeout(function() {
            console.log('Reading a user from db...');
            // resolve({ id: id, githubUserName: 'mosh' });
            reject(new Error('Could not get the user.'));
        }, 1000);
    });
}

function getRepositories(user) {
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
            console.log('Reading repos from githubUserName:',
                user.githubUserName);
            resolve(['repo1', 'repo2', 'repo3']);
        }, 2000);
    });
}

function getCommits(repo) {
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
            console.log('Reading commits from repo:', repo);
            resolve(['commit1', 'commit2', 'commit3, commit4, commit5']);
        }, 3000);
    });
}
