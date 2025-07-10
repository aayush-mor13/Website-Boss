const express = require('express');
const router = express.Router();
const userModel = require('../models/userModels');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secret_key = process.env.JWT_SECRET_KEY;

// for register
router.post('/register',async (req,res)=>{
    try{
        const {email,username,password,role} = req.body;
        
        const existingUser = await userModel.findOne({email});
        if(existingUser){
            return res.status(400).json({message: 'Email already registered !'});
        }
        const exUser = await userModel.findOne({username});
        if(exUser){
            return res.status(400).json({message: 'Username already taken !'});
        }

        const hashedpassword = await bcrypt.hash(password,10);
        const user = ({
            email,
            username,
            password : hashedpassword,
            role
        });
        await userModel.create(user);
        return res.status(200).json({message : 'User Registered !'});
    }
    catch(err){
        console.error('Error in posting user details :',err);
        if(err.code === 11000){
            return res.status(400).json({message : 'E11000 duplicate message error !'});
        }
        return res.status(400).json({message : 'An error occured while posting User details !'});
    }
});

// for login
router.post('/login', async(req,res)=>{
    try{
        const {email,password} = req.body;
        const user = await userModel.findOne({email : email});
        if (!user) {
            return res.status(401).json({message : 'Invalid Credentials !'});
        }
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(401).json({message : 'Invalid Credentials !'});
        }
        const token = jwt.sign({username : user.username,id : user._id, role : user.role},secret_key,{expiresIn : '1h'});
        return res.status(200).json({token : token,role : user.role});
    }
    catch(err){
        console.error('Error while fetching User details !',err);
        return res.status(500).json({message : 'An error occured during login !'});
    }
})

module.exports = router;