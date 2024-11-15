const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    try {
        // Extract token from cookies
        const token = req.cookies.asp_token;

        // If no token is found, return a 403 Forbidden error
        if (!token) {
            return res.status(403).json({ message: "You are not allowed to do this" });
        }

        // Verify the token with the JWT secret
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            // If token verification fails, return a 401 Unauthorized error
            if (err) {
                return res.status(401).json({ message: "Invalid token" });
            }
            // Attach the user information to the request object
            req.user = user;
            // Proceed to the next middleware or route handler
            next();
        });
    } catch (error) {
        // Handle any unexpected errors and respond with a 500 Server error
        console.error('Error in verifyToken middleware:', error);
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = verifyToken;
