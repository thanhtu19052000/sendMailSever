const nodemailer = require("nodemailer");
const express = require('express');
const router = express.Router();
const { route } = require('./accountRoute');



const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        // TODO: replace `user` and `pass` values from <https://forwardemail.net>
        user: "thanhtu19052000@gmail.com",
        pass: "bgbm fweu wfgs wshf",
    },
});
const sendMail = async (email, subject, html) => {
    const info = await transporter.sendMail({
        from: '"thanhtu19052000@gmail.com', // sender address
        to: email, // list of receivers
        subject: subject, // Subject line
        // text: "Corezoid Demo succeful", // plain text body
        html: html, // html body
    });

    console.log("Message sent: %s", info.messageId);
}
router.post('/test', async (req, res, next) => {
    const email = req.body.email;
    const subject = req.body.subject;
    const html = req.body.html;
    sendMail(email, subject, html);
    res.send('success');
})
module.exports = router;


