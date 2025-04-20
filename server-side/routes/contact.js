    // backend/routes/contact.js
    const express = require('express');
    const router = express.Router();
    const nodemailer = require('nodemailer');

    // POST /api/contact
    router.post('/', async (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const transporter = nodemailer.createTransport({
            service: process.env.EMAIL_SERVICE,
            auth: {
                user: process.env.EMAIL_USER,       // your email address
                pass: process.env.EMAIL_PASS       // your app password
        }
        });

        await transporter.sendMail({
        from: email,
        to: 'thandiogunde@gmail.com',       // 👈 Where emails go
        subject: `New message from ${name}`,
        text: message
        });

        res.status(200).json({ message: 'Message sent successfully!' });
    } catch (error) {
        console.error('Email error:', error);
        res.status(500).json({ message: 'Failed to send message' });
    }
    });

    module.exports = router;