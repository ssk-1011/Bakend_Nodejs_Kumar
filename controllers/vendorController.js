const Vendor = require('../models/Vendor');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// REGISTER
const registerVendor = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingVendor = await Vendor.findOne({ email });
    if (existingVendor) {
      return res.status(400).json({ message: 'Vendor already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const vendor = new Vendor({
      username,
      email,
      password: hashedPassword
    });

    await vendor.save();
    res.status(201).json({ message: 'Vendor registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// LOGIN
const loginVendor = async (req, res) => {
  const { email, password } = req.body;

  try {
    const vendor = await Vendor.findOne({ email });
    if (!vendor) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, vendor.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign(
      { id: vendor._id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// GET ALL VENDORS
const getAllVendors = async (req, res) => {
  try {
    const vendors = await Vendor.find().populate('firms');
    res.status(200).json(vendors);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// GET SINGLE VENDOR
const getVendorById = async (req, res) => {
  try {
    const vendor = await Vendor.findById(req.params.id).populate('firms');
    if (!vendor) {
      return res.status(404).json({ message: 'Vendor not found' });
    }
    res.status(200).json(vendor);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  registerVendor,
  loginVendor,
  getAllVendors,
  getVendorById
};
