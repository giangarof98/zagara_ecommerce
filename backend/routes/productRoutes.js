import express from 'express';
import mongoose from 'mongoose';
import {
    getProducts,
    getOne, 
    deleteProduct
} from '../controllers/productController.js';
import {protect, admin} from '../middleware/authMiddleware.js'

const router = express.Router();

//Fetch all the products
router.route('/').get(getProducts)

//Fetch product by id
router.route('/:id')
    .get(getOne)
    .delete(protect, admin, deleteProduct)

export default router;