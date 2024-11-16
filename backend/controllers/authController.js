const User = require("../models/user")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");

exports.registerUser = async(req,res,next) =>{
    const  username = req.body.username.trim().toLowerCase()
    const  email = req.body.email.trim().toLowerCase()
    const  password = req.body.password.trim()

    try{
        const UserExist = await User.findOne({email});

        if(UserExist){
            return res.status(400).json({success:false,message:"user already exists"});
        }

        const hashedPassword = await bcrypt.hash(password,10);

        const user = await User.create({username,email,password:hashedPassword});
        
        const token = jwt.sign(
            {user_Id:user._id},
            process.env.JWT_SECRET,
            {expiresIn:'1h'}
        )

        res.status(201).json({
            success:true,
            message: "User registered successfully",
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
            },
            token
        })

    }catch(err){
       return  res.status(500).json({success:false,message:"Error Registering User", error:err.message})
    }
}

exports.loginUser = async(req,res,next)=>{
    const email = req.body.email.trim().toLowerCase();
    const password = req.body.password.trim();

    try{
        const user = await User.findOne({email});

        if(!user) {
            return res.status(400).json({ success:false,message: "Invalid credentials" });
        }

        const isPasswordMatch = await bcrypt.compare(password,user.password)

        if(!isPasswordMatch){
            return res.status(400).json({ success:false,message: "Invalid credentials" });
        }

        const token = jwt.sign(
            {user_Id:user._id},
            process.env.JWT_SECRET,
            {expiresIn:'1h'}
        )

        res.status(200).json({
            success:true,
            message: "Login successful",
            user:{
                id: user._id,
                email:user.email,
                username:user.username,
            },
            token
        })

    }catch(err){
        return res.status(500).json({success:false,message:"Error in logging", error:err.message});
    }
}