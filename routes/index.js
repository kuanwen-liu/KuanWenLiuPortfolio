// File name: index.js
// Author's name: Kuan-Wen Liu
// Web site name: Kuan-Wen Liu Portfolio
// file description: Use the router.get method structure with a res.render method call to render each view.
//                   Installing Nodemailer package
//                   Create router.post for sending message to author's gmail
//                   Reference to the solution of send a message to the author's email by Codtex https://stackoverflow.com/questions/45478293/username-and-password-not-accepted-when-using-nodemailer
//                   Reference to the Youtube Tutorial Handling POST Requests. https://www.youtube.com/watch?v=rin7gb9kdpk

'use strict';
var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function (req, res) {
    res.render('index', { title: 'Kuan-Wen Liu' });
});

/* GET about page. */
router.get('/about', function (req, res) {
    res.render('about', { title: 'About Me' });
});

/* GET projects page. */
router.get('/projects', function (req, res) {
    res.render('projects', { title: 'Projects' });
});

/* GET services page. */
router.get('/services', function (req, res) {
    res.render('services', { title: 'Services' });
});

/* GET contact page. */
router.get('/contact', function (req, res) {
    res.render('contact', { title: 'Contact Me' });
});


var nodemailer = require('nodemailer');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });

// Send a message to the email
router.post('/contact', urlencodedParser, function (req, res) {
    console.log(req.body);
    // After submit the message dispaly the message on title
    res.render('contact', { title: 'Your message has sent!!' });
    // Get email, password, and message
    var email = req.body.email;
    var password = req.body.password;
    var message = req.body.message;
    // transporter user's email and password
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: email,
            pass: password
        }
    });
    // Send the message to Gmail
    var mailOptions = {
        from: email,
        to: 'c8c8c82017@gmail.com',
        subject: 'Sending Email From Kuan-Wen Liu Portfolio',
        text: message
    };
    // Display error message
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
});

module.exports = router;