const Vendor = require('../models/Vender');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET

const venderRegister = async (req, res) => {
    const { username, password, email } = req.body;

    try {
        // Check if vendor already exists
        const vendorEmail = await Vendor.findOne({ email: email });

        if (vendorEmail) {
            return res.status(400).json({ message: "Vendor already exists" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new vendor
        const newVendor = new Vendor({
            username,
            email,
            password: hashedPassword
        });

        await newVendor.save();

        res.status(201).json({ message: "Vendor registered successfully" });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
};

const venderLogin = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find vendor by email
        const vendor = await Vendor.findOne({ email: email });

        if (!vendor) {
            return res.status(400).json({ message: "Invalid email or password" });

        }   


        // Compare password
        const isPasswordValid = await bcrypt.compare(password, vendor.password);

        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: vendor._id, email: vendor.email },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.status(200).json({ message: "Login successful", token });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
};


const getAllVenders = async (req, res) => {
      

    try {
        const venders = await Vendor.find().populate('firm');
        res.status(200).json(venders);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
}

const getvenderByid=async(req,res)=>{
    const venderId=req.params.id
    try{
        const vender=await Vendor.findById(venderId).populate('firm');
       if(!vender){
        return res.status(404).json({message:"Vender not found"});
       }
     res.status(200).json(vender);
  
    }
    catch(err){
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
}




module.exports = { venderRegister, venderLogin, getAllVenders, getvenderByid };