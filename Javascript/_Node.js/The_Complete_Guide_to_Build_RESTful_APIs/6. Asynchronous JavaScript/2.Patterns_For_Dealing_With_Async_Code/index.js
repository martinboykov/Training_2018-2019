// Async
console.log('Before');
getUser(1, function(user) {
    // console.log('User:', user);
    getRepositories(user, function(repos) {
        // console.log('Repos', repos);
        getCommits(repos[0], function(commits) {
            console.log('Commits', commits);
              // CALLBACK HELL
        });
    });
});
console.log('After');

function getUser(id, cb) {
    setTimeout(function() {
        console.log('Reading a user from db...');
        cb({ id: id, githubUserName: 'mosh' });
    }, 1000);
}

function getRepositories(user, cb) {
    setTimeout(function() {
        console.log('Reading repos from githubUserName:', user.githubUserName);
        cb(['repo1', 'repo2', 'repo3']);
    }, 2000);
}

function getCommits(repo, cb) {
    setTimeout(function() {
        console.log('Reading commits from repo:', repo);
        cb(['commit1', 'commit2', 'commit3, commit4, commit5']);
    }, 3000);
}


// // Sync
// console.log('Before');
// const user = getUser(1);
// const repos = getRepositories(user.githubUserName);
// const commits = getCommits(repos[0]);
// console.log('After');
