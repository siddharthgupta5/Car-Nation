const express = require("express");
const router = express.Router();
const {protect} = require('../middlewares/authMiddleware')
const carController = require('../controllers/carController')
const upload = require('../middlewares/uploadMiddleware');


router.post('/create', protect, upload.array('images', 10), carController.createCar);

router.get('/view/:userId',protect, carController.getAllCars);
router.get('/getById/:id',protect, carController.getCarById);
router.put('/update/:id', protect,upload.array('images', 10), carController.updateCar);
router.delete('/delete/:id', protect, carController.deleteCar);

module.exports = router;