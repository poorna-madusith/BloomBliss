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

        const token = jwt.sign({email: user.email}, process.env.JWT_KEY,{expiresIn: '1h'});
        return res.status(200).json({
            messgae: "Login Successfull!",
            token,
            user: {
                name: user.name,
                email: user.email,
                mobilenumber: user.mobilenumber,
                address: user.address
            }
        })
    }catch(err){
        console.log("Error while logging in: ", err);
        return res.status(500).json({message: "Internal Server Error"});
    }
}