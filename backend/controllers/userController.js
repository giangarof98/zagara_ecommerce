import asyncHandler from "express-async-handler";
import User from '../model/userModel.js';
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
            token: null
        })
    } else {
        res.status(401)
        throw new Error(`Invalid Credentials`)
    }
});

export {
    authUser
}

