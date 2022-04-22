const mongoose = require("mongoose");

const userListSchema = new mongoose.Schema({
    saved_post:{
        type:mongoose.Types.ObjectId,
        ref:"post"
    },
    savedBy:{
        type:String
    }
},{timestamps:true})

module.exports = mongoose.model("userList",userListSchema);