const mongoose = require('mongoose');
const path = 'mongodb://localhost/playground';
mongoose.connect(`${path}`, { useNewUrlParser: true })
    .then(function() {
        console.log('Connected to ModgoDB...');
    })
    .catch((err) => console.log('Could not connect to MongoDB'));


const courseSchema = new mongoose.Schema({
    // We can use Joy as first frontal defence,
    // than also validation in db

    // VALIDATION on Mongoose level {type: type, required: booblean}
    name: { type: String, required: true },
    author: String,
    tags: [String],
    date: { type: Date, default: Date.now },
    isPublished: Boolean,
});

const Course = mongoose.model('Course', courseSchema);

async function createCourse() {
    const course = new Course({
        // name: 'Angular Course',
        author: 'Martin',
        tags: ['angular', 'frontend'],
        isPublished: true,
    });
    let result;
    try {
        result = await course.save();
        console.log(result);
        return result;
    } catch (error) {
        console.log(error.message);
    }
}
async function updateCourse(id) {
    let result;
    try {
        const course = await Course.findById(id);
        if (!course) {
            return;
        }
        course.isPublished = true;
        course.author = 'Modified Author';
        result = await course.save();
    } catch (error) {
        console.log(error.message);
    }
    return result;
}
async function removeCourse(id) {
    let result;
    try {
        result = await Course.findByIdAndRemove({ _id: id });
    } catch (error) {
        console.log(error.message);
    }
    return result;
}
createCourse();
// updateCourse('5b87de5ed7a7125224b83b89').then((course) => console.log(course));
// removeCourse('5b883caa2f652337bc357a66').then((course) => console.log(course));
