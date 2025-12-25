const express = require('express');
const router = express.Router();
const {
  registerVendor,
  loginVendor,
  getAllVendors,
  getVendorById
} = require('../controllers/vendorController');

// AUTH
router.post('/register', registerVendor);
router.post('/login', loginVendor);

// DATA
router.get('/all', getAllVendors);
router.get('/:id', getVendorById);

module.exports = router;
