// /utils/authUtils.js

const jwt = require('jsonwebtoken');

// Function to generate a JWT token
const generateToken = (userId) => {
    // Payload can include user-related data (e.g., userId, email)
    const payload = { userId };

    // Generate a token using a secret key stored in environment variables
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: '1h',
    }); // Token expires in 1 hour
    return token;
};

// Function to verify a JWT token
const verifyToken = (token) => {
    try {
        // Verify and decode the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return decoded; // Return the decoded payload if the token is valid
    } catch (error) {
        return null; // Return null if the token is invalid or expired
    }
};

// Middleware function to authenticate the user based on the token
const authenticateUser = (req, res, next) => {
    // Get the token from the Authorization header
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res
            .status(401)
            .json({ message: 'Access denied. No token provided.' });
    }

    // Verify the token
    const decoded = verifyToken(token);

    if (!decoded) {
        return res.status(401).json({ message: 'Invalid or expired token.' });
    }

    // Attach the user ID to the request object for access in subsequent route handlers
    req.userId = decoded.userId;
    next(); // Call the next middleware or route handler
};

module.exports = { generateToken, verifyToken, authenticateUser };
