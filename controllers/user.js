const User = require("../models/user");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");

const register = async (req,res) =>{
    let {username,email,password,confirmPassword,terms} = req.body;

    try{
        if(!username){
            return res.status(422).json({msg:"Username should not be empty"})
        }
        if(!email){
            return res.status(422).json({msg:"Email address should not be empty"})
        }
        if(!password){
            return res.status(422).json({msg:"Password should not be empty"})
        }
        if(!confirmPassword){
            return res.status(422).json({msg:"Please verify your password"})
        }
        if(password !== confirmPassword){
            return res.status(422).json({msg:"password don't match"})
        }
        if(terms !== true){
            return res.status(422).json({msg:"You should accept Terms and Conditions"})
        }

        // hash password
        const hashPassword = await bcrypt.hash(password,10);
        password = hashPassword;
        confirmPassword = hashPassword;

        const user = await User.create({username,email,password,confirmPassword,terms});
        return res.status(201).json({msg:"register Success"});

    }catch(err){
        if(err.code === 11000){
            return res.status(500).json({msg:"duplicate data"})
        }
        return res.status(500).json({msg:"internal server error !"})
    }
}

const login = async (req,res)=>{
    let {email,password} = req.body;

    try{
        const user = await User.findOne({email:email});
        // verify password
        const comparedPass = await bcrypt.compare(password,user.password)
        password = comparedPass;
        if(!password || !email){
            return res.status(422).json({msg:"Incorrect email or password"})
        }
        if(email !== user.email){
            return res.status(422).json({msg:"Unfound email address"})
        }
        // create token
        const token = JWT.sign({userId:user._id,userEmail:user.email,username:user.username},process.env.JWT_SECRET_CODE,{expiresIn:process.env.JWT_EXPIRE});
        // set cookie
        res.cookie("token",token,{
            httpOnly:true,
            useCredentials: false,
            maxAge: 1000 * 3600 * 24 * 30 * 1
        })
        res.cookie("signed",true,{
            maxAge: 1000 * 3600 * 24 * 30 * 1
        })

        return res.status(200).json({msg:"success",userId:user._id,token});
        
    }catch(err){
        return res.status(404).json({msg:"Email provided has not been registered"});
    }
}

const logOut = (req,res)=>{
    try{
        res.clearCookie("token");
        res.clearCookie("signed");
        return res.status(200).json({msg:"user Logged out"});
    }catch(err){
        return res.status(500).json({msg:"Error"})
    }
}

const user = async (req,res)=>{
    const {userId} = req.user;
    try{
        const user = await User.findOne({_id:userId},{password:0,confirmPassword:0})
        return res.status(200).json({user});
    }catch(err){
        return res.status(500).json(err);
    }
}

const updateUserInfo = async (req,res)=>{
    const {userId} = req.user;
    try{
        await User.findOneAndUpdate({_id:userId},{...req.body},{
            new:true
        })
        return res.status(200).json({msg:"Updated successfuly"});
    }catch(err){
        return res.status(500).json(err);
    }
}

const updateUserPassword = async (req,res)=>{
    const {userId} = req.user;
    let {currentPassword,password,confirmPassword} = req.body;
    try{
        if(!currentPassword){
            return res.status(422).json({msg:"Invalid current password"})
        }
        // compare current password with old password
        const OldUser = await User.findOne({_id:userId});
        const comparePassword = await bcrypt.compare(currentPassword,OldUser.password);
        currentPassword = comparePassword;

        // validate new password
        if(!password || password.length < 8){
            return res.status(422).json({msg:"password should be more stonger"})
        }
        if(password !== confirmPassword){
            return res.status(422).json({msg:"no match passwords"})
        }
        const hashPassword = await bcrypt.hash(password,10);
        password = hashPassword;
        confirmPassword = hashPassword;
        const user = await User.findOneAndUpdate({_id:userId},{password,confirmPassword},{
            new:true
        })
        return res.status(200).json({msg:"Updated successfuly"});
    }catch(err){
        return res.status(500).json(err);
    }
}

module.exports = {register,login,logOut,user,updateUserInfo,updateUserPassword};