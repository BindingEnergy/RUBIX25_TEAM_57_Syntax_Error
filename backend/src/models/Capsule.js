const mongoose = require('mongoose');

const capsuleSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    media: [
        {
            type: String, // URLs or file paths for media
        },
    ],
    unlockDate: {
        type: Date,
        required: true,
    },
    privacy: {
        type: String, // e.g., "private", "shared", "public"
        default: 'private',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Capsule = mongoose.model('Capsule', capsuleSchema);
module.exports = Capsule;
