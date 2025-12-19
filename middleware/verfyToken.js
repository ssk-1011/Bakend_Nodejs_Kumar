
const vendor = require('../models/Vender');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET

const verifyToken = async (req, res, next) => {
   const token = req.headers.token;

   if (!token) {
       return res.status(401).json({ message: "Access Denied. No token provided. Please Provide Token" });
   }
   try{
    const decoded = jwt.verify(token, JWT_SECRET);
    const vender= await vendor.findById(decoded.venderId);
   
if (!vender) {
    return res.status(401).json({ message: "Invalid token. Vender not found." });
   }
   req.venderId = vender._id  ;

    next();

   }catch(err){
    res.status(400).json({ message: 'Invalid token.' });
   }
};

module.exports = verifyToken;