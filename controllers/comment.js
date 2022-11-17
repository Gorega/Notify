const mongoose = require("mongoose");
const Comments = require("../models/comment");

const getComments = async (req,res)=>{
    let {postId} = req.params;
    postId = mongoose.Types.ObjectId(postId);
    try{
        const comments = await Comments.aggregate([{
            $match:{post_id:postId}
        },{
            $lookup:{
                from:"users",
                localField:"createdBy",
                foreignField:"_id",
                as:"user"
            }
        },{
            $project:{"user.password":0,"user.confirmPassword":0}
        }]);
        return res.status(201).json({comments});
    }catch(err){
        return res.status(500).json({msg:"Error"})
    }
}

const createComment = async (req,res)=>{
    const {content,post_id} = req.body;
    const {userId} = req.user;
try{
    const comments = await Comments.create({content,post_id,createdBy:userId})
    return res.status(201).json({comments});
}catch(err){
    return res.status(500).json({msg:"Error"})
}
}


module.exports = {getComments,createComment};