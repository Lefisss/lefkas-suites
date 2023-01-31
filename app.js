const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
var nodemailer = require('nodemailer');

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

app.post("/contact", function (req, res) {
    const fullname = req.body.fullname;
    const arrival = req.body.arrival;
    const email = req.body.email;
    const phonenumber = req.body.phonenumber;
    const message = req.body.message;

    const fullInquiry = "Name: " + fullname + "\n" + "Arrival date: " + arrival + "\n" + "Contact info: " + email + ", " + phonenumber + "\n" + "Message: " + message

    const emailSuccess = "Your email delivered successful to the host. We will contact you as soon as possible. Please check again your contact info. Thank you." + "\n" + "\n" + fullInquiry

    console.log(fullInquiry);

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        secure: false,
        auth: {
            user: 'lefterispour92@gmail.com',
            pass: 'dfdkrgwrxmztklng'
        }
    });

    var mailOptions = {
        from: 'lefterispour92@gmail.com',
        to: 'lefterispournaras@yahoo.gr',
        subject: 'Πληροφορίες κράτησης για ' + arrival,
        text: fullInquiry
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);

            var mailOptions = {
                from: 'lefterispour92@gmail.com',
                to: email,
                subject: 'Email delivery failure.',
                text: "There was a problem with email delivery. Please try again or contact us on info@flower-apts.com"
            };

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email didnt sent: ' + info.response);
                }
            });

        } else {
            console.log('Email sent: ' + info.response);

            var mailOptions = {
                from: 'lefterispour92@gmail.com',
                to: email,
                subject: 'Email delivered successful.',
                text: emailSuccess
            };

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });
        }
    });


    res.redirect("/contact");
})


app.post("/home", function (req, res) {
    res.render("contact")
})

app.post("/", function (req, res) {
    res.render("contact")
})













app.listen(3000, function () {
    console.log("Server start at port 3000.")
});