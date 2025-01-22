const Capsule = require('../models/Capsule');

// Create Capsule
exports.createCapsule = async (req, res) => {
    const { userId, title, content, media, unlockDate, privacy } = req.body;
    try {
        const capsule = new Capsule({
            userId,
            title,
            content,
            media,
            unlockDate,
            privacy,
        });
        await capsule.save();
        res.status(201).json(capsule);
    } catch (err) {
        res.status(500).send('Server error');
    }
};

// Get all capsules for a user
exports.getUserCapsules = async (req, res) => {
    const { userId } = req.params;
    try {
        const capsules = await Capsule.find({ userId });
        res.status(200).json(capsules);
    } catch (err) {
        res.status(500).send('Server error');
    }
};
