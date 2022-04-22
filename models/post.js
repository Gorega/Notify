const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    title:{
        type:String,
        required:[true,"title should not be empty"]
    },
    img:{
        type:String,
    },
    poster:{
        type:String
    },
    category:{
        type:String,
        required:[true,"please specify the category of this post"]
    },
    description:{
        type:String,
        required:[true,"Description should not be empty"]
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    }
},{timestamps:true})

module.exports = mongoose.model("post",postSchema);