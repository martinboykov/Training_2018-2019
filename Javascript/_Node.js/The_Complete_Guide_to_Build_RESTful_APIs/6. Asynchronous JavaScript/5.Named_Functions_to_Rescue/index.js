console.log('Before');
getUser(1, displayUser);
console.log('After');

// Replacing anonymous functions
function displayUser(user, cb) {
    // console.log('User:', user);
    getRepositories(user, displayRepositories);
}

function displayRepositories(repos, cb) {
    // console.log('Repos', repos);
    getCommits(repos[0], displayCommits);
}

function displayCommits(commits) {
    console.log('Commits', commits);
}

// Functions
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
