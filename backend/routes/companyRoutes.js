const express = require('express');
const router = express.Router();
const companyModel = require('../models/companyModels');
const verifyToken = require('../middlewares/authMiddlewares');
const authorizeRole = require('../middlewares/roleMiddlewares');

// To post a company details

router.post('/',verifyToken, authorizeRole("admin"), async (req,res)=>{
    try {
        const {
            name,
            domain,
            logo,
            tagline,
            email,
            phone,
            address,
            primaryColor,
            what,
            year
        } = req.body;

        const newCompany = new companyModel({
            name,
            domain,
            logo,
            tagline,
            contact: {
                email,
                phone,
                address
            },
            primaryColor,
            about: {
                what,
                year
            }
        });

        await newCompany.save();

        return res.status(201).json({
            message: 'Company created successfully',
            company: newCompany
        });
    }
    catch(err){
        console.error(`Error in posting the company : ${err}`);
        if (err.code === 11000) {
            const duplicatedField = Object.keys(err.keyValue)[0];
            return res.status(400).json({
                message: `Duplicate entry for "${duplicatedField}" — value must be unique.`
            });
        }
    }
})

// To get company details

router.get('/name/:slug', async (req, res) => {
    try {
        const slug = req.params.slug.toLowerCase();
        const companies = await companyModel.find();
        const company = companies.find(c => {
            const formatted = c.name.toLowerCase().replace(/\s+/g, '-');
            return formatted === slug;
        });
        if (!company) {
            return res.status(404).json({ message: "Company not found." });
        }
        return res.status(200).json(company);
    } catch (err) {
        console.error(`Error fetching company by slug: ${err}`);
        return res.status(500).json({ message: 'An error occurred while fetching the company.' });
    }
});


// GET all companies
router.get('/', async (req, res) => {
    try {
        const companies = await companyModel.find();
        return res.status(200).json(companies);
    } catch (err) {
        console.error(`Error fetching companies: ${err}`);
        return res.status(500).json({ message: 'An error occurred while fetching companies.' });
    }
});


//get company by id
router.get('/:id', async (req, res) => {
  try {
    const company = await companyModel.findById(req.params.id);
    if (!company) return res.status(404).json({ message: 'Company not found' });
    return res.status(200).json(company);
  } catch (err) {
    return res.status(500).json({ message: 'Server error' });
  }
});



module.exports = router;