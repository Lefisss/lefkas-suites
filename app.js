const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");



const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");


app.get("/", function (req, res) {
    res.render("home");
})

app.get("/home", function (req, res) {
    res.render("home");
})

app.get("/about", function (req, res) {
    res.render("about");
})

app.get("/apts", function (req, res) {
    res.render("apts");
})

app.get("/contact", function (req, res) {
    res.render("contact");
})

app.post("/home", function (req, res) {
    res.render("contact")
})

app.post("/", function (req, res) {
    res.render("contact")
})

app.listen(process.env.PORT || 3000, function () {
    console.log("Server start at port 3000.")
});