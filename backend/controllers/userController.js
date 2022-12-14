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

const updateUserProfile = asyncHandler(async (req,res) => {
    //Find a user that match
    //const user = await User.findById(req.user._id);
    const user = await User.findById(req.user._id)

    if(user){
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        if(req.body.password){
            user.password = req.body.password
        }
        const updatedUser = await user.save()

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            token: generateToken(updatedUser._id)
        })

    } else{
        res.status(404)
        throw new Error(`User not found`)
    }
});

const registerUser = asyncHandler(async(req,res) => {
    const {name, email, password} = req.body;

    const userExists = await User.findOne({email});

    if(userExists){
        res.status(400)
        throw new Error(`User already exist with this email.`)
    }
    const user = await User.create({
        name,
        email,
        password
    })

    if(user){
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })
    } else{
        res.status(400)
        throw new Error(`Invalid User data`)
    }
});

const getUsers = asyncHandler(async (req,res) => {
    
    const users = await User.find({})
    res.json(users)

    
});

const deleteUser = asyncHandler(async (req,res) => {
    
    const user = await User.findById(req.params.id)
     if(user){
        await user.remove()
        res.json({message:'User deleted'})
     } else {
        res.status(404)
        throw new Error("User wasn't found")
     }
  
});

const getUserById = asyncHandler(async (req,res) => {
    const user = await User.findById(req.params.id).select('-password')
    if(user){
        res.json(user)
    } else{
        res.status(404)
        throw new Error("User wasn't found")
    }

    
});

const updateUser = asyncHandler(async (req,res) => {
    
    const user = await User.findById(req.params.id)

    if(user){
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.isAdmin = req.body.isAdmin
        const updatedUser = await user.save()

        res.status(201).json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
        })

    } else{
        res.status(404)
        throw new Error(`User not found`)
    }
});

export {
    authUser,
    getUserProfile,
    registerUser,
    updateUserProfile,
    getUsers,
    deleteUser,
    getUserById,
    updateUser,
    
}

