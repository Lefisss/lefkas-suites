

exports.sendEmail = function (fullname, arrival, email, phonenumber, message) {
    var nodemailer = require('nodemailer');

    const { sendEmail } = require("./email");

    const fullInquiry = "Name: " + fullname + "\n" + "Arrival date: " + arrival + "\n" + "Contact info: " + email + ", " + phonenumber + "\n" + "Message: " + message

    const emailSuccess = "Your email delivered successful to the host. We will contact you as soon as possible. Please check again your contact info. Thank you." + "\n" + "\n" + fullInquiry

    console.log(fullInquiry);

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        secure: false,
        auth: {
            user: '',
            pass: ''
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

            transporter.use('compile', hbs({
                viewEngine: 'express-handlebars',
                viewPath: path.resolve('./views/'),
            }));

            var mailOptions = {
                from: '"Popina Lux Apts" <lefterispour92@gmail.com>',
                to: email,
                subject: 'Email delivered successful.',

                attachments: [
                    {
                        filename: 'luxapt3.jpg',
                        path: __dirname + '/public/pics/luxapt3.jpg',
                    },
                ],
                template: 'emailhbs',
            };


        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });

    });
}