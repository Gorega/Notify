const mongoose = require("mongoose");
const post = require("../models/post");
const userList = require("../models/userList");

const getPosts = async (req,res)=>{
    try{
        const Posts = await post.aggregate([{
            $lookup:{
                from:"users",
                localField:"createdBy",
                foreignField:"_id",
                as:"user"
            }
            },{
            $project:{"user.password":0,"user.confirmPassword":0}
            }]);
        return res.status(200).json({Posts});        
    }catch(err){
        return res.status(500).json({msg:"Error"})
    }
}

const createPost = async (req,res)=>{
    const {title,img,category,description,poster} = req.body;
    const {userId} = req.user;
    try{
        if(!category){
            return res.status(404).json({msg:"You should specify blog category"})
        }
        const Posts = await post.create({title,img,category,description,createdBy:userId,poster});
        return res.status(201).json({Posts});

    }catch(err){
        return res.status(500).json({msg:err})
    }
}

const getPost = async (req,res)=>{
    let {id} = req.params;
    id = mongoose.Types.ObjectId(id);
    try{
        const Posts = await post.aggregate([{
            $match:{_id:id}
        },{
            $lookup:{
                from:"users",
                localField:"createdBy",
                foreignField:"_id",
                as:"user"
            }}
        ]);
        return res.status(200).json(Posts);
    }catch(err){
        return res.status(500).json({msg:"Error"})
    }
}

const editPost = async (req,res)=>{
    const {id} = req.params;
    const {userId} = req.user;
    try{ 
        const Post = await post.findOneAndUpdate({_id:id,createdBy:userId},{...req.body});
        return res.status(200).json({msg:"post updated succssfuly"})
    }catch(err){
        return res.status(500).json({msg:"Error"});
    }
}

const deletePost = async (req,res)=>{
    const {userId} = req.user;
    const {id} = req.params;
    try{
        const Post = await post.findOneAndDelete({_id:id,createdBy:userId});
        return res.status(200).json({msg:"deleted successfuly"})
    }catch(err){
        return res.status(500).json({msg:"error"})
    }
}

const getSavedPost = async (req,res)=>{
    const {userId} = req.user;
    try{
        const list = await userList.aggregate([{
            $match:{savedBy:userId}
        },{
            $lookup:{
                from:"posts",
                localField:"saved_post",
                foreignField:"_id",
                as:"post"
            }
        },{
            $lookup:{
                from:"users",
                localField:"post.createdBy",
                foreignField:"_id",
                as:"user"
            }
        },{
            $project:{"post.description":0,"post.poster":0,"user.password":0,"user.confirmPassword":0}
        }])
        return res.status(200).json({list});

    }catch(err){
        return res.status(500).json({msg:"Error"})
    }

}

const savePost = async (req,res)=>{
    const {userId} = req.user;
    const {saved_post} = req.body;
    try{
        const list = await userList.create({saved_post,savedBy:userId});
        return res.status(201).json({list});
    }catch(err){
        return res.status(500).json({msg:"Error"})
    }
}

const deleteSavedPost = async (req,res)=>{
    const {postId} = req.params;
    const {userId} = req.user;
    try{
        const list = await userList.findOneAndDelete({saved_post:postId,savedBy:userId});
        return res.status(200).json({list});
    }catch(err){
        return res.status(500).json({msg:"Error"})
    }
}

module.exports = {getPosts,createPost,getPost,editPost,deletePost,getSavedPost,savePost,deleteSavedPost};