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
    author: authorSchema,
}));

async function createCourse(name, author) {
    const course = new Course({
        name,
        author,
    });

    const result = await course.save();
    console.log(result);
}

async function listCourses() {
    const courses = await Course.find();
    console.log(courses);
}

// createCourse(
//   'Node Course',
//   new Author({ name: 'Mosh' }));
// subdocument (same properties as document(validation, etc))


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
