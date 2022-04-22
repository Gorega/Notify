const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    post_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"post"
    },
    content:{
        type:String,
        required:true
    }
},{timestamps:true})

module.exports = mongoose.model("comment",commentSchema);