const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true,"username should not be empty"],
        unique:[true,"The username you entered exists"]
    },
    email:{
        type:String,
        required:[true,"Email address should not be empty"],
        match:[/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,"Please fill a valid email address"],
        unique:[true,"Email exists"]
    },
    password:{
        type:String,
        required:[true,"password should not be embty"]
    },
    confirmPassword:{
        type:String,
        required:[true,"you must confirm your password"]
    },
    first_name:String,
    last_name:String,
    intro:String,
    address:String,
    date:String,
    gender:String,
    phone_number:String,
    location:String,
    prfile_img:{
        type:String,
        default:"https://www.pngitem.com/pimgs/m/150-1503945_transparent-user-png-default-user-image-png-png.png"
    }

},{timeseries:true})

module.exports = mongoose.model("user",userSchema);