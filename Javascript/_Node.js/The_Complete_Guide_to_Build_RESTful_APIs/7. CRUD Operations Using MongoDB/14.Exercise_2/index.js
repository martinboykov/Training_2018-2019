const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/mongo-exercises')
    .then(() => console.log('Connected to MongoDB database...'));

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [],
    date: Date,
    isPublished: Boolean,
    price: Number,
});
const Course = mongoose.model('Course', courseSchema);

async function getCourses() {
    let courses;
    try {
        courses = await Course
            .find({ isPublished: true })
            .or([{ tags: 'frontend' }, { tags: 'backend' }])
            .sort({ price: -1 })
            .select({ name: 1, author: 1, price: 1 });
    } catch (error) {
        console.log(error.message);
    }
    return courses;
}

getCourses().then((courses) => console.log(courses));
