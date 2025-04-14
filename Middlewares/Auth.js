

require('dotenv').config();
const jwt = require('jsonwebtoken');

const ensureAuthenticated = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(403).json({
            message: 'Unauthorized: Bearer token required'
        });
    }

    const token = authHeader.split(' ')[1]; // Extract token after "Bearer "

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Add decoded payload to request
        next();
    } catch (err) {
        return res.status(403).json({
            message: 'Unauthorized: Invalid or expired token'
        });
    }
};

module.exports = ensureAuthenticated;




















// require('dotenv').config()
// const jwt = require('jsonwebtoken');
// const ensureAuthenticated = (req, res, next) => {
//     const auth = req.headers['authorization'];
//     if (!auth) {
//         return res.status(403)
//             .json({ message: 'Unauthorized, JWT token is require' });
//     }
//     try {
//         const decoded = jwt.verify(auth, process.env.JWT_SECRET);
//         req.user = decoded;
//         next();
//     } catch (err) {
//         return res.status(403)
//             .json({ message: 'Unauthorized, JWT token wrong or expired' });
//     }
// }

// module.exports = ensureAuthenticated;