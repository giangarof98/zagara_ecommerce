import asyncHandler from "express-async-handler";
import User from '../model/userModel.js';
import generateToken from '../utils/generateToken.js'
import mongoose from "mongoose";

const authUser = asyncHandler(async (req,res) => {
    const { email, password} = req.body;

    //Find a user that match
    const user = await User.findOne({email})

    if(user && (await user.matchPassword(password))){
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })
    } else {
        res.status(401)
        throw new Error(`Invalid Credentials`)
    }
});

const getUserProfile = asyncHandler(async (req,res) => {
    //Find a user that match
    //const user = await User.findById(req.user._id);
    const user = await User.findById(req.user._id)

    if(user){
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        })
    } else{
        // res.status(401)
        // throw new Error(`User not found`)
    }
});

export {
    authUser,
    getUserProfile,
}

