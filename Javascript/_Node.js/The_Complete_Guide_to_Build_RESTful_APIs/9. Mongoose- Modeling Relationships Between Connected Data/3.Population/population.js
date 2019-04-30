const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground', { useNewUrlParser: true })
    .then(() => console.log('Connected to MongoDB...'))
    .catch((err) => console.error('Could not connect to MongoDB...', err));

const Author = mongoose.model('Author', new mongoose.Schema({
    name: String,
    bio: String,
    website: String,
}));

const Course = mongoose.model('Course', new mongoose.Schema({
    name: String,
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Author',
    },
}));

async function createAuthor(name, bio, website) {
    const author = new Author({
        name,
        bio,
        website,
    });

    const result = await author.save();
    console.log(result);
}

async function createCourse(name, author) {
    const course = new Course({
        name,
        author,
    });

    const result = await course.save();
    console.log(result);
}

async function listCourses() {
    const courses = await Course
        .find()
        // .populate('author') // getting the entire collection of props from author
        // .populate('author', 'name') // getting only name from collection of props from author
        .populate('author', 'name -_id') // getting only name and excluding id from collection of props from author
        .select('name author');
    console.log(courses);
}

// createAuthor('Mosh', 'My bio', 'My Website');

// createCourse('Node Course', '5b8a9fcc0208e5026465aea7');

listCourses();
