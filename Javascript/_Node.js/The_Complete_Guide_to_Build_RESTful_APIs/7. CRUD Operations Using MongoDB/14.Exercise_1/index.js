const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mongo-exercises')
    .then(() => console.log('Connected to MongoDB...'))
    .catch((err) => console.log('Could not connect to MongoDB'));

const Schema = mongoose.Schema;
const courseSchema = new Schema({
    name: String,
    author: String,
    tags: [],
    date: Date,
    isPublished: Boolean,
    price: Number,
});
const Courses = mongoose.model('Courses', courseSchema);

async function getCourses() {
    let courses;
    try {
        courses = await Courses
            .find({ isPublished: true, tags: 'backend' })
            .sort({ name: 1 })
            .select({ name: 1, author: 1 });
    } catch (error) {
        console.log(error.message);
    }
    return courses;
}

// console.log is separate from getCourses,
// as its not its responsibility to display them :)
getCourses()
    .then((result) => console.log(result));
