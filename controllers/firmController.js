const Firm = require('../models/Firm');
const Vendor = require('../models/Vendor');

// ADD FIRM
const addFirm = async (req, res) => {
  try {
    const { firmName, area, category, region, offer } = req.body;
    const image = req.file ? req.file.path : null;

    const vendor = await Vendor.findById(req.vendorId);
    if (!vendor) {
      return res.status(404).json({ message: 'Vendor not found' });
    }

    const firm = new Firm({
      firmName,
      area,
      category,
      region,
      offer,
      image,
      vendor: vendor._id
    });

    const savedFirm = await firm.save();
    vendor.firms.push(savedFirm._id);
    await vendor.save();

    res.status(201).json(savedFirm);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// DELETE FIRM
const deleteFirmById = async (req, res) => {
  try {
    const firm = await Firm.findByIdAndDelete(req.params.firmId);
    if (!firm) {
      return res.status(404).json({ message: 'Firm not found' });
    }

    await Vendor.findByIdAndUpdate(
      firm.vendor,
      { $pull: { firms: firm._id } }
    );

    res.status(200).json({ message: 'Firm deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { addFirm, deleteFirmById };
