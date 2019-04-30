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
  const courses = await Course
    // .find({ author: 'Martin', isPublished: true })

    // only names starting with /^pattern/
    .find({ author: /^M/ }) // -> M_____ -> Martin will be selected
    // only names ending with /pattern$/
    .find({ author: /n$/ }) // ____n -> Martin will be selected
    // only names with /.*pattern.*/ specific symbols anywhere
    .find({ author: /.*a.*/ }) // a -> Martin will be selected
    .limit(10)
    .sort({ name: 1 }) // 1 for ascending/ -1 for descen0ding
    .select({ name: 1, tags: 1 }); // select specific keys of the ohj
  console.log(courses);
}
getCourses();
