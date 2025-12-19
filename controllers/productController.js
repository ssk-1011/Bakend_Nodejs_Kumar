// const Product = require('../models/Product');
// const multer = require('multer');


// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/');
//   },
//   filename: (req, file, cb) => {
//     cb(
//       null,
//       Date.now() + path.extname(file.originalname)
//     );
//   }
// });

// const upload = multer({
//   storage: storage,

// });


// const addProduct=async(req, res) => {
//     try{
//         const { productName, price, description, category, bestSeller } = req.body;
//           const image=req.file? req.file.path : undefined;
//         const firmId = req.parms.firmId;

//         const firm = await Firm.findById(firmId); 

//         if (!firm) {
//             return res.status(404).json({ message: "Firm not found" });
//         }

//         const product = new Product({
//             productName,
//             price,
//             description,
//             category,
//             bestSeller,
//             image,
//             firm: firm._id
//         });

//         const saveProduct = await product.save();
//         firm.products.push(saveProduct);
//         await firm.save();

//         res.status(200).json(saveProduct);
//     }
//     catch(error){
//         res.status(500).json({message:"Server Error"});
//     }   
// }



// exports.addProduct = { 
//   addProduct: [upload.single('image'), addProduct]
// };

const Product = require('../models/Product');
const Firm = require('../models/Firm');
const multer = require('multer');
const path = require('path');

// ---------- MULTER ----------
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// ---------- CONTROLLERS ----------

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
    res.status(500).json({ message: 'Server Error' });
  }
};

// GET PRODUCTS BY FIRM
const getProductByFirm = async (req, res) => {
  try {
    const firmId = req.params.firmId;

    const firm = await Firm.findById(firmId);
    if (!firm) {
      return res.status(404).json({ message: 'Firm not found' });
    }

    const restaurantName = firm.name;

    const products = await Product.find({ firm: firmId });
    res.status(200).json({ restaurantName, products });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
}

// ---------- DELETE PRODUCT ----------
const deleteProductById = async (req, res) => {
  try {
    const productId = req.params.productId;

    const deletedProduct = await Product.findByIdAndDelete(productId);
    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    await Firm.findByIdAndUpdate(
      deletedProduct.firm,
      { $pull: { products: productId } }
    );

    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }



};

// ✅ EXPORT ONLY WHAT EXISTS
module.exports = {
  upload,
  addProduct,
  getProductByFirm,
  deleteProductById
};