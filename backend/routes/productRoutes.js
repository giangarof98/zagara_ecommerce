import express from 'express';
import mongoose from 'mongoose';
import {getProducts,getOne} from '../controllers/productController.js';
const router = express.Router();

//Fetch all the products
router.route('/').get(getProducts)

//Fetch product by id
router.route('/:id').get(getOne);

export default router;