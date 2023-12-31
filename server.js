const express = require("express");
const path = require("path");
const app = express();
const { engine } = require("express-handlebars");

const workingHoursMiddleware = (req, res, next) => {
  const now = new Date();
  const dayofWeek = now.getDay();
  const hourofDay = now.getHours();
  if (dayofWeek >= 1 && dayofWeek <= 5 && hourofDay >= 9 && hourofDay < 17) {
    next();
  } else {
    res.render("sorry");
  }
};
app.use(express.static("public"));
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");
app.use(workingHoursMiddleware);

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/ourservices", (req, res) => {
  res.render("ourservices");
});
app.get("/contactus", (req, res) => {
  res.render("contactus");
});

app.listen(5000, (err) => {
  if (err) throw err;
  console.log("server is running");
});
