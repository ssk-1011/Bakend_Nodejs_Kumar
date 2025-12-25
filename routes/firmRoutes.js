const express = require('express');
const router = express.Router();
const { addFirm, deleteFirmById } = require('../controllers/firmController');
const verifyToken = require('../middleware/verifyToken');
const multer = require('multer');
const path = require('path');

// MULTER
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

// ROUTES
router.post('/add', verifyToken, upload.single('image'), addFirm);
router.delete('/:firmId', verifyToken, deleteFirmById);

router.get('/upload/:imageName', (req, res) => {
  res.sendFile(`${__dirname}/../uploads/${req.params.imageName}`);
});

module.exports = router;


