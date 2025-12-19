const venderController = require('../controllers/venderController');
const express = require('express');
const router = express.Router();


// Post Methods
router.post('/register', venderController.venderRegister);
router.post('/login', venderController.venderLogin);

// Get Methods
router.get('/all-venders', venderController.getAllVenders);
router.get('/single-vender/:id', venderController.getvenderByid);
module.exports = router;