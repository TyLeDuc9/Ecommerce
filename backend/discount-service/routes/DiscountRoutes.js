const express = require('express');
const router = express.Router();
const DiscountController=require('../controllers/DiscountController');

router.post('/create', DiscountController.createDiscount);
router.get('/all', DiscountController.getAllDiscounts);
router.get('/:id', DiscountController.getDiscountById);
router.put('/update/:id', DiscountController.updateDiscount);
router.delete('/delete/:id', DiscountController.deleteDiscount);
module.exports = router;