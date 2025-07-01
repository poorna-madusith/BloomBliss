const Users = require('../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');




//signup
exports.signup = async (req, res) => {
    const {name,email,mobilenumber,address,password} = req.body;

    try{
        let existinguser = await Users.findOne({email});
        if(existinguser){
            return res.status(400).json({message: "Email Already Taken! "});
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newuser = new Users({
            name,
            email,
            mobilenumber,
            address,
            password: hashedPassword
        });
        
        await newuser.save();
        return res.status(200).json({message: "User Created Successfully!"})
    }catch(err){
        console.error("error while signing up: ",err);
        return res.status(500).json({message:"Internal Server Error"});
    }
}


//Login
exports.login = async (req,res) => {
    const {email, password} = req.body;

    try{
        const user = await Users.findOne({email});
        if(!user){
            return  res.status(404).json({message: "No user found with this email! "});
        }
        
        const validPassword = await bcrypt.compare(password, user.password);
        if(!validPassword){
            return res.status(400).json({message: "Invalid Password! "});
        }

        console.log('User found:', { id: user._id, email: user.email });

        const tokenPayload = {
            id: user._id.toString(), // Convert ObjectId to string
            email: user.email
        };

        console.log('Token payload:', tokenPayload);

        const token = jwt.sign(tokenPayload, process.env.JWT_KEY, { expiresIn: '1h' });
        
        return res.status(200).json({
            message: "Login Successful!",
            token,
            user: {
                id: user._id.toString(), // Convert ObjectId to string
                name: user.name,
                email: user.email,
                mobilenumber: user.mobilenumber,
                address: user.address
            }
        });
    } catch(err){
        console.error("Error while logging in: ", err);
        return res.status(500).json({message: "Internal Server Error"});
    }
}

//update profile
exports.updateProfile = async(req,res) => {
    const{name,email,address,mobilenumber} = req.body;

    try{
        let user = await Users.findOne({email: req.user.email});
        if(!user){
            return res.status(404).json({message: "User not found!"});
        }

        if(name) user.name = name;
        if(email) user.email = email;
        if(address) user.address = address;
        if(mobilenumber) user.mobilenumber = mobilenumber;

        await user.save();
        return res.status(200).json({message: "Profile updated successfully!", user});
    }catch(err){
        console.error("Error while updating profile: ", err);
        return res.status(500).json({message: "Internal Server Error"});
    }
}

//getprofile
exports.getProfile = async (req,res) => {
    try{
        const user = await Users.findOne({email:req.user.email});
        if(!user){
            return res.status(404).json({message: "User not found!"});
        }
        return res.status(200).json({
            name: user.name,
            email: user.email,
            mobilenumber: user.mobilenumber,
            address: user.address
        });
        
    }catch(err){
        console.error("Error while fetching profile: ", err);
        return res.status(500).json({message: "Internal Server Error"});
    }
}


//get user count
exports.getUserCount = async (req, res) => {
    try {
        const count = await Users.countDocuments();
        return res.status(200).json({ count });
    } catch (error) {
        console.error('Error getting user count:', error);
        return res.status(500).json({ message: 'Error getting user count' });
    }
};