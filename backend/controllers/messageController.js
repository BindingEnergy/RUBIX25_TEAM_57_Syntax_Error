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

        sendEmail(
            recipientEmail,
            'New Message Received !',
            `You have received a new message from ${from}.`
        );

        if (data)
            return res.json({
                msg: 'Message added successfully.',
                message: data.message,
            });
        else return res.json({ msg: 'Failed to add message to the database' });
    } catch (ex) {
        next(ex);
    }
};
