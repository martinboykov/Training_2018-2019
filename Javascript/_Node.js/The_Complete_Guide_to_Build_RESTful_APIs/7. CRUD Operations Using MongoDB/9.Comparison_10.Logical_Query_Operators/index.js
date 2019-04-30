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
    // -------------------
    // mongodb shorthands
    // -------------------
    // eq (equal)
    // ne (not equal)
    // gt (greater than)
    // gte (greater than or equal to)
    // lt (less than)
    // lte (less than or equal to)
    // in (in)
    // nin (not in)

    const courses = await Course
        // using $ to use shorthands (gt)
        // gte,lte -> between 10 and 20
        // in -> courses that are 10,15 or 20 dolars
        // .find({ price: { $in: [10, 15, 20] } })
        // .find({ author: 'Martin', isPublished: true })
        .find()
        // find courses with author: Martin OR isPublished: true
        // .or([{ author: 'Martin' }, { isPublished: true }])
        // find courses with author: Martin AND isPublished: true
        .and([{ author: 'Martin' }, { isPublished: true }])
        .limit(10)
        .sort({ name: 1 }) // 1 for ascending/ -1 for descen0ding
        .select({ name: 1, tags: 1 }); // select specific keys of the ohj
    console.log(courses);
}
getCourses();
