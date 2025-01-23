const Messages = require('../models/messageModel');
const { uploadOnCloudinary } = require('../utils/cloudinaryConfig');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const sendEmail = require('../utils/emailService');
const User = require('../models/userModel');

module.exports.getMessages = async (req, res, next) => {
    try {
        const { from, to } = req.body;

        const messages = await Messages.find({
            users: {
                $all: [from, to],
            },
        }).sort({ updatedAt: 1 });

        const projectedMessages = messages.map((msg) => {
            return {
                fromSelf: msg.sender.toString() === from,
                message: msg.message.text,
                fileUrl: msg.message.fileUrl,
                unlockDateTime: msg.message.unlockDateTime,
            };
        });
        res.json(projectedMessages);
    } catch (ex) {
        next(ex);
    }
};

module.exports.addMessage = async (req, res, next) => {
    try {
        const { from, to, message, unlockDateTime } = req.body;

        let fileUrl = null;
        if (req.file) {
            const uploadResponse = await uploadOnCloudinary(req.file.path);
            fileUrl = uploadResponse.secure_url;
        }

        const data = await Messages.create({
            message: {
                text: message,
                fileUrl: fileUrl,
                unlockDateTime: unlockDateTime,
            },
            users: [from, to],
            sender: from,
        });

        // Fetch the recipient's email address
        const recipient = await User.findById(to);
        const recipientEmail = recipient.email;

        // Fetch the sender's username
        const sender = await User.findById(from);
        const senderUsername = sender.username;

        // Send email notification for normal text messages
        if (!fileUrl) {
            sendEmail(
                recipientEmail,
                'New Message Received!',
                `You have received a new message from ${senderUsername}.
                ~ TEAM UnlockIT ~
                
                `
            );
        }

        // Send email notification for files with unlock date
        if (fileUrl && unlockDateTime) {
            sendEmail(
                recipientEmail,
                'New File Received!',
                `You have received a new file from ${senderUsername}. It will unlock on ${new Date(
                    unlockDateTime
                ).toLocaleString()}.`
            );
        }

        if (data)
            return res.json({
                msg: 'Message added successfully.',
                message: data.message,
            });
    } catch (ex) {
        next(ex);
    }
};
