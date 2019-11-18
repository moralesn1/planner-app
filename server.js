if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const expressLayouts = require("express-ejs-layouts");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");

// Routers
// Home Page
const indexRouter = require("./routes/index");
// Planner crud
const schedulesRouter = require("./routes/schedules");

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.set("layout", "layouts/layout");

app.use(expressLayouts);
app.use(methodOverride("_method"));
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: false }));

const mongoose = require("mongoose");
mongoose.connect(process.env.DB_URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true
});
const db = mongoose.connection;
db.on("error", error => console.log(error));
db.once("open", () => console.log("Connected To Mongoose"));

app.use("/", indexRouter);
app.use("/schedules", schedulesRouter);

app.listen(process.env.PORT || 3000, () => {
  console.log(`You are running on Port ${process.env.PORT || 3000}`);
});
