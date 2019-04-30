const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/mongo-exercises')
    .then(() => console.log('Conneted to MongoDB database...'));

const coursesSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [],
    date: Date,
    isPublished: Boolean,
    price: Number,
});

const Course = mongoose.model('Course', coursesSchema);

async function getCourses() {
    let courses;
    try {
        courses = await Course
            .find({ isPublished: true })
            .or([{ price: { $gte: 15 } }, { name: /.*by.*/ }]);
    } catch (error) {
        console.log(error.message);
    }
    return courses;
}
getCourses().then((courses) => console.log(courses));
