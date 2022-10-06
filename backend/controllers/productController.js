import asyncHandler from "express-async-handler";
import Product from '../model/productModel.js';
import mongoose from "mongoose";

const getProducts = asyncHandler(async (req,res) => {
    const products = await Product.find({});
    res.json(products);
});

const getOne = asyncHandler(async (req,res) => {
    const product = await Product.findById(req.params.id)
    if(product){
        res.json(product)
    } else {
        res.status(404)
        throw new Error('Product not found')
    }
})

export{
    getProducts,
    getOne
}