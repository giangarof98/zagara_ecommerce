import express from 'express';
import mongoose from 'mongoose';
import {
    getProducts,
    getOne, 
    deleteProduct,
    createProduct,
    updateProduct,
    createReview,
} from '../controllers/productController.js';
import {protect, admin} from '../middleware/authMiddleware.js'

const router = express.Router();

//Fetch all the products
router.route('/')
    .get(getProducts)
    .post(protect, admin, createProduct)

router.route('/:id/reviews').post(protect, createReview)

//Fetch product by id
router.route('/:id')
    .get(getOne)
    .delete(protect, admin, deleteProduct)
    .put(protect, admin, updateProduct)

export default router;