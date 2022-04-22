const user = require("../models/user");

const getAllUsers = async (req,res)=>{
    const {username} = req.query;
    try{
        const Users = await user.find({}).select("username");
        const User = Users.filter((user)=> user.username.toLowerCase().indexOf(username.toLowerCase()) > -1);
        return res.status(200).json({User});
    }catch(err){
        return res.status(500).json({msg:"Error"});
    }
}

const getUser = async(req,res)=>{
    const {userId} = req.params;
    try{
        const User = await user.findOne({_id:userId}).select(`-password -confirmPassword`)
        console.log(User)
        return res.status(200).json({User})
    }catch(err){
        return res.status(500).json({msg:"Error"})
    }
}


module.exports = {getAllUsers,getUser};