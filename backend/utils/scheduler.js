const cron = require('node-cron');
const sendEmail = require('./emailService');
const Message = require('../models/messageModel');
const User = require('../models/userModel');

const initializeScheduler = () => {
    // Schedule a task to run every minute
    cron.schedule('* * * * *', async () => {
        const now = new Date();
        const oneDayFromNow = new Date(now.getTime() + 24 * 60 * 60 * 1000);
        const oneHourFromNow = new Date(now.getTime() + 60 * 60 * 1000);
        const oneMinuteFromNow = new Date(now.getTime() + 60 * 1000);

        const messages = await Message.find({
            'message.unlockDateTime': {
                $gte: now,
                $lte: oneDayFromNow,
            },
        });

        for (const message of messages) {
            const unlockTime = new Date(message.message.unlockDateTime);
            const timeDiff = unlockTime - now;

            if (
                timeDiff <= 24 * 60 * 60 * 1000 &&
                timeDiff > 23 * 60 * 60 * 1000
            ) {
                // 1 day away
                const recipient = await User.findById(message.users[1]); // Assuming the recipient is the second user in the array
                const recipientEmail = recipient.email;

                sendEmail(
                    recipientEmail,
                    'File Unlock Notification',
                    `A file you received will unlock in 1 day on ${unlockTime.toLocaleString()}.`
                );
            } else if (
                timeDiff <= 60 * 60 * 1000 &&
                timeDiff > 59 * 60 * 1000
            ) {
                // 1 hour away
                const recipient = await User.findById(message.users[1]); // Assuming the recipient is the second user in the array
                const recipientEmail = recipient.email;

                sendEmail(
                    recipientEmail,
                    'File Unlock Notification',
                    `A file you received will unlock in 1 hour on ${unlockTime.toLocaleString()}.`
                );
            } else if (timeDiff <= 60 * 1000 && timeDiff > 59 * 1000) {
                // 1 minute away
                const recipient = await User.findById(message.users[1]); // Assuming the recipient is the second user in the array
                const recipientEmail = recipient.email;

                sendEmail(
                    recipientEmail,
                    'File Unlock Notification',
                    `A file you received will unlock in 1 minute on ${unlockTime.toLocaleString()}.`
                );
            }
        }
    });
};

module.exports = initializeScheduler;
