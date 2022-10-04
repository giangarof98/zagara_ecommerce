import express from 'express';
import asyncHandler from "express-async-handler"
import Product from '../model/productModel.js';
import mongoose from 'mongoose';
const router = express.Router();

//Fetch all the products
router.get('/', asyncHandler(async (req,res) => {
    const products = await Product.find({});
    res.json(products);
}));

//Fetch product by id
router.get('/:id', asyncHandler( async (req,res) => {
    const product = await Product.findById(req.params.id)
    if(product){
        res.json(product)
    } else {
        res.status(404).json({message: 'Product not found'})
    }
}));

export default router;