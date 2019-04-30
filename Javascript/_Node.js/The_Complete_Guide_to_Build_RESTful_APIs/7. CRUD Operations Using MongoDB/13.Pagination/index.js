const mongoose = require('mongoose');


// path(url) should come from config file
// same as with express
const path = 'mongodb://localhost/playground';

// returns a promise
mongoose.connect(`${path}`, { useNewUrlParser: true })
    .then(function() {
        console.log('Connected to ModgoDB...');
        // here we can use debug(), the same as with express server
    })
    .catch((err) => console.log('Could not connect to MongoDB'));


const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: { type: Date, default: Date.now },
    isPublished: Boolean,
});

// compililng Schema to Model => creating Class
const Course = mongoose.model('Course', courseSchema);

async function createCourse() {
    // creating object from class Course
    const course = new Course({
        name: 'Angular Course',
        author: 'Martin',
        tags: ['angular', 'frontend'],
        isPublished: true,
    });

    // saving course to db, which is async operation
    const result = await course.save();
    console.log(result);
}
// createCourse();

async function getCourses() {
    // values for pagination:
    const pageNumber = 2;
    const pageSize = 10;

    const courses = await Course
        .find({ author: 'Martin', isPublished: true })
        .skip((pageNumber - 1) * pageSize)
        .limit(pageSize)
        .sort({ name: 1 });

    console.log(courses);
}
getCourses();
