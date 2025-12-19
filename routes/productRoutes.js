// const expess = require('express');
// const router = expess.Router();
// const productController = require('../controllers/productController');

// router.post('/add-product/:firmId', productController.addProduct);

// module.exports = router;

const express = require('express');
const router = express.Router();

const {
  upload,
  addProduct,
  getProductByFirm,
  deleteProductById
} = require('../controllers/productController');

router.post(
  '/add-product/:firmId',
  upload.single('image'),
  addProduct
);

router.get(
  '/firm/:firmId',
  getProductByFirm
);

router.get('/upload/:imageName', (req, res) => {
  const imageName = req.params.imageName;
  res.setHeader('Content-Type', 'image/jpeg');
  res.sendFile(`${__dirname}/../uploads/${imageName}`);
});

// ✅ FIX HERE
router.delete('/:productId', deleteProductById);

module.exports = router;
