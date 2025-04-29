const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const ReviewController = require('../controllers/ReviewController');

router.post('/create', ReviewController.createReview);
router.get('/all', ReviewController.getAllReviews);
router.get('/:id', ReviewController.getReviewById);
router.put('/update/:id', ReviewController.updateReview); 
router.delete('/delete/:id', ReviewController.deleteReview);

module.exports = router;
