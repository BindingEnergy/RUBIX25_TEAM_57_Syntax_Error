const jwt = require('jsonwebtoken');

// Authentication middleware
const authMiddleware = (req, res, next) => {
    // Get token from Authorization header
    const token = req.header('Authorization');
    if (!token) return res.status(401).send('No token, authorization denied');

    try {
        // Decode the token and attach the user data to the request object
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attaching user data (userId) to the request
        next(); // Proceed to the next middleware or route handler
    } catch (err) {
        res.status(400).send('Invalid token');
    }
};

module.exports = authMiddleware;
