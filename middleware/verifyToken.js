const Vendor = require('../models/Vendor');
const jwt = require('jsonwebtoken');

const verifyToken = async (req, res, next) => {
  try {
    // Expect: Authorization: Bearer <token>
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res
        .status(401)
        .json({ message: 'Access denied. Token missing.' });
    }

    const token = authHeader.split(' ')[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const vendor = await Vendor.findById(decoded.id);
    if (!vendor) {
      return res
        .status(401)
        .json({ message: 'Invalid token. Vendor not found.' });
    }

    // Attach vendor id to request
    req.vendorId = vendor._id;

    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: 'Invalid or expired token.' });
  }
};

module.exports = verifyToken;
