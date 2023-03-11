// jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

var items = ["Buy Food", "Cook Food", "Eat Food"];
var workItems = [];

app.set("view engine", "ejs");

app.get("/", function(req, res) {
  const today = new Date();

  let options = {
    weekday: "long",
    day: "numeric",
    month: "long"
  };

  const day = today.toLocaleDateString("en-US", options);
  const newdate = today.getFullYear();

  res.render("list", {
    listTitle: day,  newListItems: items, date: newdate
  });
});

app.post("/", function(req, res) {
  const item = req.body.newItem;
  if (req.body.list === "work") {
    workItems.push(item);
    res.redirect("/work");
  } else {
    items.push(item);
    res.redirect("/");
  }
});

app.get("/work", function(req, res) {
  const today = new Date();
  const newdate = today.getFullYear();
  res.render("list", {listTitle: "Work List", newListItems: workItems, date: newdate});
});

app.post("/work", function(req, res) {
  let item = req.body.newItem;
  workItems.push(item);
  res.redirect("/work");
});

app.get("/about", function(req, res) {
  const today = new Date();
  const newdate = today.getFullYear();
  res.render("about", {
    date: newdate
  });
});

app.listen(process.env.PORT || 3000, function() {
  console.log("Server is running on port 3000");
});
