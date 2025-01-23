// filepath: /c:/Users/santu/Desktop/RUBIX25_TEAM_57_Syntax_Error/backend/routes/testRoutes.js
const express = require('express');
const router = express.Router();
const sendEmail = require('../utils/emailService');

router.get('/send-test-email', (req, res) => {
    const testEmail = 'santusht.matra11@gmail.com'; // Replace with your test email
    sendEmail(
        testEmail,
        'Test Email',
        'This is a test email to verify email functionality.'
    );
    res.send('Test email sent.');
});

module.exports = router;
