const User = require("../models/user");
const Token = require("../models/token");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const mongoose = require("mongoose");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

const myOAuth2Client = new OAuth2(
  process.env.MAIL_CLIENT_ID,
  process.env.MAIL_CLIENT_SECRET,
  "https://developers.google.com/oauthplayground"
  )

myOAuth2Client.setCredentials({
  refresh_token:process.env.MAIL_REFRESH_TOKEN
  });

const myAccessToken = myOAuth2Client.getAccessToken()

const forgetPass = async (req,res)=>{
    const {to} = req.body;
    try{
        if(!to){
          return res.status(422).json({msg:"Please provide a valid email address"})
        }
        const user =  await User.findOne({email:to});
        const ResetPassLinkToken = JWT.sign({email:to},process.env.JWT_SECRET_CODE,{expiresIn:"1h"});
        if(!user){
            return res.status(404).json({msg:"Email provided not exist"});
        }
        let token = await Token.findOne({userId:user._id});
        if(!token){
          token = await new Token({
            userId:user._id,
            token:ResetPassLinkToken,
            tokenExpire:new Date().getTime(),
          }).save();
        }

        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
                type: "OAuth2",
                user: process.env.EMAIL_SERVICE,
                clientId: process.env.MAIL_CLIENT_ID,
                clientSecret: process.env.MAIL_CLIENT_SECRET,
                refreshToken: process.env.MAIL_REFRESH_TOKEN,
                accessToken: myAccessToken
          }
        });
          
        const mailOptions = {
            from: process.env.EMAIL_SERVICE,
            to: to,
            subject: 'Notify - Reset password',
            html: `<h1>Notify</h1> 
                <p>Reset Password </p>
                <hr/>
                <h3>Hi,</h3>
                <p> We received a request to reset the password for your account. </p>
                <p> To reset you password, click on the button below: </p>
                <a href="https://notify-gorega-preview.onrender.com/reset/pass/${token.token}"><button> Reset Password </button></a>
            `
          };
          
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });
        return res.status(200).json({msg:"link has been send you your email"});
    }catch(err){
        return res.status(500).json({msg:err})
    }
}

const resetPass = async(req,res)=>{
    const {token} = req.params;
    let {newPass,newConfirmPass} = req.body;
  try{
        const tokenModel = await Token.findOne({token:token});
        
        // validate new password
        if(!newPass || !newConfirmPass || newPass.length < 8){
          return res.status(422).json({msg:"Please add a valid password"});
        }
        if(newPass !== newConfirmPass){
          return res.status(422).json({msg:"Password don't match"})
        }

        const hashPassword = await bcrypt.hash(newPass,10);
        newPass = hashPassword;
        newConfirmPass = hashPassword;
        await User.findOneAndUpdate({_id:mongoose.Types.ObjectId(tokenModel.userId)},{password:newPass,confirmPassword:newConfirmPass});
        await Token.deleteMany({});
        return res.status(200).json({msg:"password updated successfuly"});
    }catch(err){
        return res.status(500).json({msg:"invalid link"})
    }
}

module.exports = {forgetPass,resetPass};