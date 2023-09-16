const mongoose = require("mongoose");
mongoose
  .connect("mongodb://127.0.0.1:27017/playground")
  .then(() => console.log("Connected to DataBase"))
  .catch((err) => console.log("Cannot connect to mongodb ", err.message));

//Schema
const courseSchema = mongoose.Schema({
  name: { type: String, required: true, minLength: 5, maxLength: 255 },
  category: {
    type: String,
    required: true,
    enum: ["web", "mobile", "network"],
  },
  author: String,
  tags: {
    type: Array,
    validate: {
      isAsync: true,
      validator: function (v) {
        return new Promise((resolve) => {
          setTimeout(() => {
            const result = v && v.length > 0;
            resolve(result);
          }, 1000);
        });
      },
      message: "A course must have one tag.",
    },
  },
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
  price: {
    type: Number,
    required: function () {
      return this.isPublished;
    },
  },
});
const Course = mongoose.model("course", courseSchema);
async function createCourse() {
  const course = new Course({
    name: "Remix Js",
    author: "Ahmad",
    //tags: ["React", "Frontend"],
    isPublished: true,
    category: "sada",
    price: 15,
  });
  try {
    await course.validate();
    // const result = await course.save();
    // console.log(result);
  } catch (ex) {
    for (field in ex.errors) {
      console.log(ex.errors[field].message);
    }
  }
}
async function getCourse() {
  const courses = await Course.find({ author: "Ahmad", isPublished: true })
    .limit(10)
    .sort({ name: 1 })
    .count();
  console.log(courses);
}

async function updateCourse(id) {
  const result = await Course.findByIdAndUpdate(
    id,
    {
      $set: {
        author: "Ahmad",
        isPublished: true,
      },
    },
    { new: true }
  );
  console.log(result);
}

async function removeCourse(id) {
  const result = await Course.deleteOne({ _id: id });
  console.log(result);
}

createCourse();
