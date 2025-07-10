const express = require('express');
const router = express.Router();
const companyUserModel = require('../models/companyUserModels');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authorizeRole = require('../middlewares/roleMiddlewares');
const verifyToken = require('../middlewares/authMiddlewares');
const secret_key = process.env.JWT_SECRET_KEY;

// for register
router.post('/register',async (req,res)=>{
    try{
        const {email,username,password,companyUserRole,companyId} = req.body;
        
        const existingUser = await companyUserModel.findOne({email});
        if(existingUser){
            return res.status(400).json({message: 'Email already registered !'});
        }
        // const exUser = await companyUserModel.findOne({username});
        // if(exUser){
        //     return res.status(400).json({message: 'Username already taken !'});
        // }

        const hashedpassword = await bcrypt.hash(password,10);
        const user = ({
            email,
            username,
            password : hashedpassword,
            companyUserRole,
            companyId
        });
        await companyUserModel.create(user);
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
        const {email,password,companyId} = req.body;
        const user = await companyUserModel.findOne({ email: email, companyId: companyId });

            if (!user) {
            return res.status(401).json({ message: 'Invalid Credentials!' });
            }

        const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
            return res.status(401).json({ message: 'Invalid Credentials!' });
        }
        const token = jwt.sign({username : user.username,id : user._id, companyUserRole : user.companyUserRole},secret_key,{expiresIn : '1h'});
        return res.status(200).json({token : token,companyUserRole : user.companyUserRole, userId: user._id});
    }
    catch(err){
        console.error('Error while fetching User details !',err);
        return res.status(500).json({message : 'An error occured during login !'});
    }
})

// get user details
router.get('/user/:id', verifyToken, async (req, res) => {
    try {
        const userId = req.params.id;

        const user = await companyUserModel.findById(userId);
        console.log('Found user:', user);
        if (!user) {
            return res.status(404).json({ message: 'User not found!' });
        }

        return res.status(200).json(user);
    } catch (err) {
        console.error('Error while fetching user by ID:', err);
        return res.status(500).json({ message: 'An error occurred while retrieving the user!' });
    }
});

module.exports = router;