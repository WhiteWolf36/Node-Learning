const mongoose = require("mongoose");
mongoose
  .connect("mongodb://127.0.0.1:27017/mongo-exercises")
  .then(() => console.log("Authorized"))
  .catch((err) => console.log(`Failed to Authorize ${err.message}`));

const courseSchema = mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: Date,
  price: Number,
  isPublished: Boolean,
});

const Course = mongoose.model("course", courseSchema);

async function getCourses() {
  return await Course.find().or([{ price: { $gte: 15 } }, { name: /.*by.*/i }]);
}

async function run() {
  const courses = await getCourses();
  console.log(courses);
}
run();
