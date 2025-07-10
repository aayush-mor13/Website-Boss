const express = require('express');
const router = express.Router();
const domainModel = require('../models/domainModels');
const verifyToken = require('../middlewares/authMiddlewares');
const authorizeRole = require('../middlewares/roleMiddlewares');

// To post a domain

router.post('/',async (req,res)=>{
    try{
        const {domain} = req.body;
        const newdomain = new domainModel({domain});
        await domainModel.create(newdomain);
        return res.status(201).json(newdomain);
    }
    catch(err){
        console.error(`Error in posting the domain : ${err}`);
        return res.status(500).json({message : 'An error occured while posting domain'});
    }
})

// To get domains

router.get('/',async (req,res)=>{
    try{
        const domains = await domainModel.find();
        return res.send(domains);
    }
    catch(err){
        console.log(`Error fetching domains ${err}`);
        return res.status(500).json({message : 'An error occured while fetching domains !'});
    }
})

module.exports = router;