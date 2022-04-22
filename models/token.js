const mongoose = require("mongoose");

const tokenSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Types.ObjectId,
        required:true,
        ref:"user"
    },
    token:{
        type:String,
        required:true
    },
    tokenExpire:{
        type:Date,
    }
})

module.exports = mongoose.model("token",tokenSchema);