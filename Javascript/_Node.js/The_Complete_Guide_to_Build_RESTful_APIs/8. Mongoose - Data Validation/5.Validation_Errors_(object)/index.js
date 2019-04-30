const mongoose = require('mongoose');
const path = 'mongodb://localhost/playground';
mongoose.connect(`${path}`, { useNewUrlParser: true })
    .then(function() {
        console.log('Connected to ModgoDB...');
    })
    .catch((err) => console.log('Could not connect to MongoDB'));


const courseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
    },
    category: {
        type: String,
        required: true,

        enum: ['web', 'mobile', 'network'],
    },
    author: String,
    tags: {
        type: Array,
        validate: {
            isAsync: true,
            validator: function(value, callback) {
                setTimeout(() => {
                    const result = value && value.length > 0;
                    callback(result);
                }, 4000);
            },
            message: 'A course should have at least one tag!',
        },
    },
    date: { type: Date, default: Date.now },
    isPublished: Boolean,
    price: {
        type: Number,
        required: function() {
            return this.isPublished;
        },
        min: 10,
        max: 200,
    },
});

const Course = mongoose.model('Course', courseSchema);

async function createCourse() {
    const course = new Course({
        name: 'Angular Course',
        category: '-',
        author: 'Martin',
        tags: [],
        isPublished: true,
        price: 12,
    });
    let result;
    try {
        result = await course.save();
        console.log(result);
    } catch (error) {
        // Errors property of Error
        // errors have properties equal to property names of
        // unsuxesfully valiated object (differs from Schema)
        for (const property in error.errors) {
            if (error.errors.hasOwnProperty(property)) {
                // console.log(error.errors[property]); // entire object
                console.log(error.errors[property].message); // only the message
            }
        }
    }
    return result;
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
        return result;
    } catch (error) {
        console.log(error.message);
    }
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
