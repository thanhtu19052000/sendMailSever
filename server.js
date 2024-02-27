const express = require('express');
const app = express();
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();

// Middleware để xử lý dữ liệu từ phần thân của yêu cầu POST
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        // Sử dụng biến môi trường để lưu thông tin đăng nhập
        user: 'thanhtu19052000@gmail.com',
        pass: 'bgbm fweu wfgs wshf',
    },
});

const sendMail = async (email, subject, html) => {
    try {
        const info = await transporter.sendMail({
            from: '"Thanh Tu" <thanhtu19052000@gmail.com>',
            to: email,
            subject: subject,
            html: html,
        });
        console.log("Message sent: %s", info.messageId);
    } catch (error) {
        console.error("Error occurred while sending email:", error);
    }
};

app.post('/sendMail', async (req, res, next) => {
    const { email, subject, html } = req.body;
    sendMail(email, subject, html);
    res.send('success');
});

app.get('/', (req, res, next) => {
    res.json('home');
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log('Server started on port ', PORT);
});
