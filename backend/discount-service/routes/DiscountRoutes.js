const express = require('express');
const router = express.Router();
const DiscountController=require('../controllers/DiscountController');

router.post('/discount/create', DiscountController.createDiscount);
router.get('/discount/all', DiscountController.getAllDiscounts);
router.get('/discount/:id', DiscountController.getDiscountById);
router.put('/discount/update/:id', DiscountController.updateDiscount);
router.delete('/discount/delete/:id', DiscountController.deleteDiscount);
module.exports = router;