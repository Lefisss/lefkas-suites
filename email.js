

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
                from: '"Popina Lux Apts" <lefterispour92@gmail.com>',
                to: email,
                subject: 'Email delivered successful.',
                // text: emailSuccess,
                html: `<img style="width: 50%" src="cid:unique@kreatalefteris.ee" /><br></br><!DOCTYPE html>
                <html lang="en">
                
                <head>
                    <meta charset="UTF-8">
                    <meta http-equiv="X-UA-Compatible" content="IE=edge">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Reservation details</title>
                    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet"
                        integrity="sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD" crossorigin="anonymous">
                </head>
                
                <body>
                    <div class="container">
                        <div class="row">
                            <div class="col-lg-6">
                                <h1>Reservation details.</h1>
                                <h2>Email delivered successful.</h2>
                            </div>
                            <div class="col-lg-6">
                                <h1>Check your reservation details and feel free to contact us for anything.</h1>
                            </div>
                        </div>
                    </div>
                </body>
                
                </html>`,

                attachments: [
                    {
                        filename: 'popina.jpg',
                        path: __dirname + '/public/pics/popina.jpg',
                        cid: "unique@kreatalefteris.ee"
                    },
                ]
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