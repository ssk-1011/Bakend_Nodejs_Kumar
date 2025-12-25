const Product = require('../models/Product');
const Firm = require('../models/Firm');


// ADD PRODUCT
const addProduct = async (req, res) => {
  try {
    const { productName, price, description, category, bestSeller } = req.body;
    const image = req.file ? req.file.path : null;
    const firmId = req.params.firmId;

    const firm = await Firm.findById(firmId);
    if (!firm) {
      return res.status(404).json({ message: 'Firm not found' });
    }

    const product = new Product({
      productName,
      price,
      description,
      category,
      bestSeller,
      image,
      firm: firm._id
    });

    const savedProduct = await product.save();
    firm.products.push(savedProduct._id);
    await firm.save();

    res.status(201).json(savedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// GET PRODUCTS BY FIRM
const getProductsByFirm = async (req, res) => {
  try {
    const firm = await Firm.findById(req.params.firmId);
    if (!firm) {
      return res.status(404).json({ message: 'Firm not found' });
    }

    const products = await Product.find({ firm: firm._id });
    res.status(200).json({
      firmName: firm.firmName,
      products
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// DELETE PRODUCT
const deleteProductById = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    await Firm.findByIdAndUpdate(
      product.firm,
      { $pull: { products: product._id } }
    );

    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  addProduct,
  getProductsByFirm,
  deleteProductById
};
