const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground', { useNewUrlParser: true })
    .then(() => console.log('Connected to MongoDB...'))
    .catch((err) => console.error('Could not connect to MongoDB...', err));

const authorSchema = new mongoose.Schema({
    name: String,
    bio: String,
    website: String,
});
const Author = mongoose.model('Author', authorSchema);

const Course = mongoose.model('Course', new mongoose.Schema({
    name: String,
    authors: [authorSchema], // Array of AuthorSchema
}));

async function createCourse(name, authors) { // passing array of authors
    const course = new Course({
        name,
        authors,
    });

    const result = await course.save();
    console.log(result);
}

// createCourse(
//   'Node Course', [
//     new Author({ name: 'Mosh' }),
//     new Author({ name: 'Josh' }),
//   ]);

async function addAuthor(courseId, author) {
    const course = await Course.findById(courseId);
    course.authors.push(author);
    course.save();
    console.log(course);
}
// addAuthor('5b8aaecaef182341e443b021', new Author({ name: 'Bob' }));

async function removeAuthor(courseId, authorId) {
    const course = await Course.findById(courseId);

    // id() - finding object with that id
    const author = await course.authors.id(authorId);
    await author.remove();
    await course.save();
    console.log(course);
}
// removeAuthor('5b8aaecaef182341e443b021', '5b8ab06ce31295242029b4c8');


async function listCourses() {
    const courses = await Course.find();
    console.log(courses);
}

async function updateAuthor(courseId) {
    // const course = await Course.findById(courseId);
    // course.author.name = 'Updated';
    // console.log(course);
    // can only be saved by parent (course.save(), not course.author.save())
    // await course.save();

    // second aproach - direct update
    const course = await Course.updateOne({ _id: courseId }, {
        $set: {
            'author.name': 'Updated',
        },
    });
}


// updateAuthor('5b8aaa0ddd86530f981a6c8b');


async function removeProperty(courseId) {
    const course = await Course.updateOne({ _id: courseId }, {
        // $unset: {
        //   'author.name': '',
        // },
        $unset: {
            'author': '',
        },
    });
}
// removeProperty('5b8aaa0ddd86530f981a6c8b');
