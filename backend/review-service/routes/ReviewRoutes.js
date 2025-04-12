const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const ReviewController = require('../controllers/ReviewController');

router.post('/review/create', ReviewController.createReview);
router.get('/review/all', ReviewController.getAllReviews);
router.get('/review/:id', ReviewController.getReviewById);
router.put('/review/update/:id', ReviewController.updateReview); 
router.delete('/review/delete/:id', ReviewController.deleteReview);

module.exports = router;
