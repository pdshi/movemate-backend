const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {

    const token = req.headers.authorization;

    if (!token) {

        return res.status(401).json({ success: false, message: 'No token provided' });

    }

    try {

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Attach the decoded payload to the request object
        req.decodedToken = decoded;

        // Proceed to the next middleware or route handler
        next();

    } catch (error) {

        return res.status(403).json({ success: false, message: 'Failed to authenticate token' });

    }
};

module.exports = verifyToken;
