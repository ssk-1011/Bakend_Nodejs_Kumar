const express = require('express');
const frimController = require('../controllers/firmController');
const verifyToken = require('../middleware/verfyToken');
const router = express.Router();

router.post('/add-firm', verifyToken, frimController.addFirm);
router.get('/upload/:imageName', (req, res) => {
    const imageName = req.params.imageName;
    req.header = { 'Content-Type': 'image/jpeg' };
   
    res.sendFile(`${__dirname}/../uploads/${imageName}`);
       
});

router.delete('/:firmId', frimController.deleteFirmById);
module.exports = router;
