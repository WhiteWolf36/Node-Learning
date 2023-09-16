require("dotenv").config();
const express = require("express");
const logger = require("./middleware/logger");
const auth = require("./middleware/auth");
const helmet = require("helmet");
const morgan = require("morgan");
const config = require("config");
const startupDebugger = require("debug")("app:startup");
const dbDebugger = require("debug")("app:db");
const courses = require("./routes/courses");
const homepage = require("./routes/homepage");

const app = express();
app.set("view engine", "pug");
app.set("views", "./views");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(helmet());
app.use("/api/courses", courses);
app.use("/", homepage);

//Configuration
console.log("Name: " + config.get("name"));
console.log("Mail Server: " + config.get("mail.host"));
console.log("Mail Password: " + config.get("mail.password"));

if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  startupDebugger("Morgan Enabled");
}

//DB Work
dbDebugger("Connected to the DataBase..");

app.use(logger);
app.use(auth);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on Port ${port}`);
});
