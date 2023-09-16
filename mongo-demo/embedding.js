const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/playground")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB...", err));

const authorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  website: String,
});

const Author = mongoose.model("Author", authorSchema);

const Course = mongoose.model(
  "Course",
  new mongoose.Schema({
    name: String,
    authors: [authorSchema],
  })
);

async function createCourse(name, authors) {
  const course = new Course({
    name,
    authors,
  });

  const result = await course.save();
  console.log(result);
}

async function updateCourse(courseId) {
  const course = await Course.updateOne(
    { _id: courseId },
    {
      $unset: {
        author: "",
      },
    }
  );
}

async function addAuthor(courseId, author) {
  const course = await Course.findById(courseId);
  course.authors.push(author);
  course.save();
}

async function listCourses() {
  const courses = await Course.find();
  console.log(courses);
}

async function removeAuthor(courseId, authorId) {
  const course = await Course.findById(courseId);
  const author = course.authors.id(authorId);
  author.deleteOne(authorId);
  course.save();
}

// createCourse("Node Course", [
//   new Author({ name: "Ahmad" }),
//   new Author({ name: "Aziz" }),
// ]);
//updateCourse("64ec2acded4146a6335b80c6");

//addAuthor("64ec52c34fe9c1d4fbbe3042", new Author({ name: "Ali" }));
removeAuthor("64ec52c34fe9c1d4fbbe3042", "64ec53bfbbaac745394716b0");
