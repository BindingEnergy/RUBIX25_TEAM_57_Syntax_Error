const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const nodemailer = require('nodemailer');

// Register route
exports.register = async (req, res) => {
    const { username, email, password, name, gender, mobile } = req.body;
    try {
        const userExists = await User.findOne({ email });
        if (userExists) return res.status(400).send('User already exists');

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({
            username,
            email,
            password: hashedPassword,
            name,
            gender,
            mobile,
        });
        await user.save();

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });
        res.status(201).json({ token });
    } catch (err) {
        res.status(500).send('Server error');
    }
};

// Login route
exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).send('Invalid credentials');

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).send('Invalid credentials');

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });
        res.status(200).json({ token });
    } catch (err) {
        res.status(500).send('Server error');
    }
};

exports.forgotPassword = async (req, res) => {
    console.log('Forgot password endpoint hit');
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            console.log('User not found');
            return res.status(400).send('User not found');
        }

        const resetToken = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        // Configure nodemailer
        const transporter = nodemailer.createTransport({
            service: 'gmail', // Ensure you're using lowercase 'gmail'
            auth: {
                user: process.env.MAIL_EMAIL,
                pass: process.env.MAIL_PASS,
            },
            tls: {
                rejectUnauthorized: false,
            },
        });

        const mailOptions = {
            from: process.env.MAIL_EMAIL,
            to: user.email,
            subject: 'Password Reset',
            text: `You requested a password reset. Please use the following token to reset your password: ${resetToken}`,
        };

        // Send email and handle errors
        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                console.error('Nodemailer error:', err);
                return res.status(500).send('Error sending email');
            }
            console.log('Password reset email sent:', info.response);
            res.status(200).send('Password reset email sent');
        });
    } catch (err) {
        console.error('Forgot password error:', err);
        res.status(500).send('Server error');
    }
};
