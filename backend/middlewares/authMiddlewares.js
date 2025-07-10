const jwt = require('jsonwebtoken');
require('dotenv').config();
const secret_key = process.env.JWT_SECRET_KEY;

const verifyToken = (req, res, next) => {
  let token;

  const authHeader = req.headers['authorization'] || req.headers['Authorization'];
  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.split(" ")[1];
  }

  if (!token && req.headers['company-token']) {
    token = req.headers['company-token'];
  }

  if (!token) {
    return res.status(400).json({ message: 'No token, Authorization denied!' });
  }

  try {
    const decoded = jwt.verify(token, secret_key);
    req.user = decoded;
    console.log("Decoded User: ", req.user);
    next();
  } catch (err) {
    console.error("Token verification failed:", err.message);
    return res.status(401).json({ message: 'Invalid or expired token!' });
  }
};

module.exports = verifyToken;
